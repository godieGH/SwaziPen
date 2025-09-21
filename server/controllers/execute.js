import { exec } from "child_process";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import path from "path";
import util from "util";
import chalk from "chalk";
const execAsync = util.promisify(exec);

function safeLog(req, colorFn, message, ...args) {
   if (!req.quiet) {
      console.log(colorFn(message), ...args);
   }
}

async function execute(req, res) {
   try {
      const { code, filename } = req.body;
      const tmpDir = path.join(req.scannedWD, ".temp");
      const tmpFile = path.join(tmpDir, filename);

      await fs.outputFile(tmpFile, code, "utf8");

      const command = `swazi ${tmpFile}`;

      let swaziOutput;
      try {
         safeLog(req, chalk.green, `Start Executing ${filename}`)
         const { stdout, stderr } = await execAsync(command, {
            cwd: tmpDir,
            timeout: 10000
         });
         swaziOutput = { stdout, stderr };
      } catch (runErr) {
         swaziOutput = {
            error: runErr.message,
            stdout: runErr.stdout,
            stderr: runErr.stderr
         };
      }

      await fs.remove(tmpFile);

      res.json({ output: swaziOutput });
   } catch (err) {
      try {
         const tmpFile = path.join(req.scannedWD, ".temp", "exec.sl");
         await fs.remove(tmpFile);
      } catch (cleanupErr) {}
      res.status(500).json({ error: err.message });
   }
}

export default execute;
