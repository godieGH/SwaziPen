// server/terminal.js
import pty from "node-pty";
import fs from "fs-extra";
import path from "path";
import crypto from "crypto";

/**
 * Attach terminal handlers to a socket connection.
 *
 * Protocol:
 * client -> server:
 *  - terminal:create { id, mode: "repl" | "run", cols, rows, code?, filename? }
 *  - terminal:input { id, data }
 *  - terminal:resize { id, cols, rows }
 *  - terminal:kill { id }
 *
 * server -> client:
 *  - terminal:created { id }
 *  - terminal:data { id, data }
 *  - terminal:exit { id, code, signal }
 *  - terminal:error { id, message }
 *  - terminal:killed { id }
 */
export default function attachTerminalHandlers(socket, scannedWD) {
    const terminals = new Map();

    function makeId(prefix = "term") {
        return `${prefix}-${crypto.randomBytes(6).toString("hex")}`;
    }

    async function spawnRunPty({
        id,
        cols = 80,
        rows = 24,
        code = "",
        filename = "run.sl"
    }) {
        const tmpDir = path.join(scannedWD || process.cwd(), ".temp");
        const cwd = scannedWD || process.cwd();

        // Candidate absolute path inside scannedWD
        let candidatePath = filename ? path.join(cwd, filename) : null;

        let tmpFile;
        let createdTmp = false;
        let runPath;

        try {
            // If filename exists in the project, use that real file path
            if (candidatePath && (await fs.pathExists(candidatePath))) {
                runPath = candidatePath;
            } else {
                // Otherwise create a temporary file (previous behavior)
                await fs.ensureDir(tmpDir);
                const uniqueName = `${Date.now()}-${crypto
                    .randomBytes(4)
                    .toString("hex")}-${filename}`;
                tmpFile = path.join(tmpDir, uniqueName);
                await fs.writeFile(tmpFile, code, "utf8");
                createdTmp = true;
                runPath = tmpFile;
            }
        } catch (err) {
            socket.emit("terminal:error", {
                id,
                message: "Failed to prepare run file: " + err.message
            });
            return;
        }

        try {
            const env = Object.assign({}, process.env);
            env.TERM = env.TERM || "xterm-color";

            const p = pty.spawn("swazi", [runPath], {
                name: "xterm-color",
                cols,
                rows,
                cwd,
                env
            });

            p.onData(data => {
                socket.emit("terminal:data", { id, data });
            });

            p.onExit(async ({ exitCode, signal }) => {
                socket.emit("terminal:exit", { id, code: exitCode, signal });
                // cleanup tmp file only if we created one
                if (createdTmp && tmpFile) {
                    try {
                        await fs.remove(tmpFile);
                    } catch (e) {
                        // ignore cleanup error
                    }
                }
                terminals.delete(id);
            });

            terminals.set(id, {
                pty: p,
                tmpFile: createdTmp ? tmpFile : undefined
            });
            socket.emit("terminal:created", { id });
        } catch (err) {
            // cleanup on spawn failure (only remove tmp we created)
            try {
                if (createdTmp && tmpFile) await fs.remove(tmpFile);
            } catch (e) {}
            socket.emit("terminal:error", { id, message: "" + err });
        }
    }

    function spawnReplPty({ id, cols = 80, rows = 24 }) {
        try {
            const env = Object.assign({}, process.env);
            env.TERM = env.TERM || "xterm-color";

            const p = pty.spawn("swazi", ["-i"], {
                name: "xterm-color",
                cols,
                rows,
                cwd: scannedWD || process.cwd(),
                env
            });

            p.onData(data => {
                socket.emit("terminal:data", { id, data });
            });

            p.onExit(({ exitCode, signal }) => {
                socket.emit("terminal:exit", { id, code: exitCode, signal });
                terminals.delete(id);
            });

            terminals.set(id, { pty: p });
            socket.emit("terminal:created", { id });
        } catch (err) {
            socket.emit("terminal:error", { id, message: "" + err });
        }
    }

    socket.on("terminal:create", async (opts = {}) => {
        const id = opts.id || makeId("term");
        const cols = opts.cols || 80;
        const rows = opts.rows || 24;
        const mode = opts.mode || "repl"; // default repl

        // If already exists, kill old one first
        if (terminals.has(id)) {
            try {
                const t = terminals.get(id);
                t.pty.kill();
            } catch (e) {}
            terminals.delete(id);
        }

        if (mode === "run") {
            // opts should contain code and filename
            await spawnRunPty({
                id,
                cols,
                rows,
                code: opts.code || "",
                filename: opts.filename || "run.sl"
            });
        } else if (mode === "repl") {
            spawnReplPty({ id, cols, rows });
        } else {
            socket.emit("terminal:error", {
                id,
                message: "Unsupported terminal mode"
            });
        }
    });

    socket.on("terminal:input", ({ id, data } = {}) => {
        if (!id) return;
        const store = terminals.get(id);
        if (!store || !store.pty) return;
        try {
            store.pty.write(data);
        } catch (err) {
            socket.emit("terminal:error", { id, message: "" + err });
        }
    });

    socket.on("terminal:resize", ({ id, cols, rows } = {}) => {
        if (!id) return;
        const store = terminals.get(id);
        if (!store || !store.pty) return;
        try {
            store.pty.resize(cols, rows);
        } catch (err) {
            socket.emit("terminal:error", { id, message: "" + err });
        }
    });

    socket.on("terminal:kill", async ({ id } = {}) => {
        if (!id) return;
        const store = terminals.get(id);
        if (!store) return;
        try {
            store.pty.kill();
            // cleanup temporary file if present
            if (store.tmpFile) {
                try {
                    await fs.remove(store.tmpFile);
                } catch (e) {}
            }
            terminals.delete(id);
            socket.emit("terminal:killed", { id });
        } catch (err) {
            socket.emit("terminal:error", { id, message: "" + err });
        }
    });

    socket.on("disconnect", () => {
        // kill all ptys for this socket
        terminals.forEach(store => {
            try {
                store.pty.kill();
            } catch (e) {}
            if (store.tmpFile) {
                try {
                    fs.removeSync(store.tmpFile);
                } catch (e) {}
            }
        });
        terminals.clear();
    });
}
