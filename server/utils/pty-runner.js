import pty from "node-pty";

/**
 * runInPty(program, args, options)
 * - program: string, e.g. "swazi"
 * - args: string[]  e.g. [tmpFile]
 * - options: { cwd?: string, env?: object, cols?: number, rows?: number, timeout?: number }
 *
 * Returns a Promise that resolves with { stdout: string, exitCode, signal }
 * - stdout contains combined ANSI output from the pty
 * - If timeout triggers, the child is killed and promise resolves with error info in the stdout.
 */
export function runInPty(program, args = [], options = {}) {
  const {
    cwd = process.cwd(),
    env = process.env,
    cols = 80,
    rows = 24,
    timeout = 15_000
  } = options;

  return new Promise((resolve, reject) => {
    let collected = "";
    let finished = false;

    const ptyEnv = Object.assign({}, env, { TERM: env.TERM || "xterm-256color" });

    let proc;
    try {
      proc = pty.spawn(program, args, {
        name: "xterm-256color",
        cols,
        rows,
        cwd,
        env: ptyEnv
      });
    } catch (err) {
      return reject(err);
    }

    const onData = (d) => {
      collected += d;
    };
    proc.onData(onData);

    const onExit = ({ exitCode, signal }) => {
      if (finished) return;
      finished = true;
      try { proc.offData && proc.offData(onData); } catch (e) {}
      resolve({ stdout: collected, exitCode, signal });
    };

    proc.onExit(onExit);

    // timeout safety
    const to = setTimeout(() => {
      if (finished) return;
      finished = true;
      try { proc.kill(); } catch (e) {}
      resolve({
        stdout: collected + "\n\n[process killed by timeout]\n",
        exitCode: null,
        signal: "SIGTERM"
      });
    }, timeout);

    // ensure we clear timeout when finished
    const wrappedResolve = (val) => {
      clearTimeout(to);
      if (!finished) finished = true;
      try { proc.kill(); } catch (e) {}
      resolve(val);
    };

    // Replace onExit to use wrappedResolve
    proc.onExit(({ exitCode, signal }) => {
      wrappedResolve({ stdout: collected, exitCode, signal });
    });
  });
}