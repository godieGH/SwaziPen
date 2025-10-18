#!/usr/bin/env node
import path from "path";
import fs from "fs";
import { program } from "commander";
import chalk from "chalk";
import chokidar from "chokidar";
import inquirer from "inquirer";
import { exec } from "child_process";

import pkg from "../package.json" with { type: "json" };
import scanProject from "../src/scanner.js";
import startServer from "../server/index.js";

program
  .name("swazipen")
  .description(pkg.description)
  .version(pkg.version, "-v, --version", "output the current version");

// new options: --compiler/-c and --open
program
  .option("-p, --port <port>", "server will run on custom port")
  .option("-q, --quiet", "server will run on quietly, no logs (requests, file operation logs etc), only errors")
  .option("-c, --compiler <path>", "path to swazi binary (overrides system PATH)")
  .option("--open", "open the default browser automatically to the local server");

program
  .argument("[path]", "path to project folder (defaults to current folder)")
  .action(async (source, options) => {
    try {
      process.stdout.write('\x1Bc');
      console.log(`\u276F Swazipen v${pkg.version}`)
      let projectPath;
      if (!source) {
        const ans = await inquirer.prompt([
          {
            type: "input",
            name: "pathInput",
            message: "No project path provided. Please enter project folder path:",
            default: ".",
            validate: input => {
              const resolved = path.resolve(input);
              if (!fs.existsSync(resolved) || !fs.lstatSync(resolved).isDirectory()) {
                return "Path does not exist or is not a directory.";
              }
              return true;
            }
          }
        ]);
        projectPath = path.resolve(ans.pathInput);
      } else {
        projectPath = path.resolve(source);
        if (!fs.existsSync(projectPath) || !fs.lstatSync(projectPath).isDirectory()) {
          console.error(chalk.red("Error:") + " Provided path does not exist or is not a directory:");
          console.error("  " + chalk.yellow(projectPath));
          process.exit(1);
        }
      }
      let port = options.port ? Number(options.port) : undefined;
      if (options.port && (isNaN(port) || port <= 0 || port > 65535)) {
        console.error(chalk.red("Error:") + ` Invalid port "${options.port}".`);
        const ans = await inquirer.prompt([
          {
            type: "input",
            name: "portInput",
            message: "Please provide a valid port number:",
            default: 5000,
            validate: input => {
              const p = Number(input);
              return !isNaN(p) && p > 0 && p < 65536 ? true : "Port must be a number between 1 and 65535";
            }
          }
        ]);
        port = Number(ans.portInput);
      }
      if (!port) {
        port = Number(process.env.PORT) || 5000;
      }

      const projectName = path.basename(projectPath);

      console.log(
        chalk.cyan.bold("→") + " " + chalk.blue.bold("SwaziPen") + " scanning project:"
      );
      console.log("  " + chalk.magenta(projectName) + " (" + chalk.gray(projectPath) + ")");

      // Simple spinner characters
      const spinnerChars = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'];
      let spinnerIndex = 0;
      let scannedCount = 0;
      const start = Date.now();

      // Start interval to animate spinner + count in a single line
      const frameInterval = 80; // ms
      const interval = setInterval(() => {
        const ch = spinnerChars[spinnerIndex % spinnerChars.length];
        const elapsed = ((Date.now() - start) / 1000).toFixed(1);
        process.stdout.write(`\r${chalk.green(ch)} Scanning... ${scannedCount} items in (${elapsed}s)`);
        spinnerIndex++;
      }, frameInterval);

      // onNode callback increments scannedCount — passed into scanProject opts
      function onNode() {
        scannedCount++;
      }

      // run scanProject and pass the callback
      const fileTree = await scanProject(projectPath, { followSymlinks: false, onNode });

      // stop spinner and print final summary on single line
      clearInterval(interval);
      const totalTime = ((Date.now() - start) / 1000).toFixed(2);
      process.stdout.write(`\r${chalk.green('✔')} Scan completed. ${scannedCount} items in ${totalTime}s\n`);

      console.log(chalk.green.bold("→") + " " + "Starting server...");
      const watcher = chokidar.watch(projectPath, { persistent: true, ignoreInitial: true, depth: undefined, followSymlinks: false, ignored: [
         /node_modules/,
         /(?:^|[\/\\])\.git/,
         /(?:^|[\/\\])\.svn/,
         /(?:^|[\/\\])\.hg/,
         /(?:^|[\/\\])\.cache/,
         /(?:^|[\/\\])\.vscode/,
         /(?:^|[\/\\])\.idea/,
         /(?:^|[\/\\])dist/,
         /(?:^|[\/\\])build/,
         /(?:^|[\/\\])public/,
         /(?:^|[\/\\])out/,
         /(?:^|[\/\\])\.next/,
         /(?:^|[\/\\])\.nyc_output/,
         /\.log$/,
         /\.map$/,
         /\.tmp$/,
         /\.temp$/,
         /\.swp$/,
         /\.(png|jpg|jpeg|gif|ico|svg|mp4|mov|mp3|wav)$/
      ] });

      // validate compiler path (if provided)
      let compilerPath;
      if (options.compiler) {
        compilerPath = path.resolve(options.compiler);
        if (!fs.existsSync(compilerPath) || !fs.lstatSync(compilerPath).isFile()) {
          console.error(
            chalk.red("Error:") +
              " Provided compiler path does not exist or is not a file:"
          );
          console.error("  " + chalk.yellow(compilerPath));
          process.exit(1);
        }
      }

      // Pass compilerPath and open flag into server options
      const serverOptions = Object.assign({}, options, {
        compilerPath: compilerPath,
        open: Boolean(options.open)
      });

      const srvResult = startServer(fileTree, port, projectPath, watcher, serverOptions);

      // if user requested --open, attempt to open the browser to the local URL
      if (serverOptions.open) {
        const localUrl = `http://localhost:${port}`;
        const opener =
          process.platform === "win32"
            ? "start"
            : process.platform === "darwin"
            ? "open"
            : "xdg-open";
        try {
          // fire-and-forget; best-effort cross-platform open
          exec(`${opener} "${localUrl}"`, (err) => {
            if (err) {
              console.error(chalk.yellow("Warning: failed to open browser:"), err.message);
            }
          });
        } catch (e) {
          console.error(chalk.yellow("Warning: failed to open browser:"), e.message);
        }
      }
    } catch (err) {
      console.error(chalk.red("Unhandled error: "), chalk.grey(err.message));
      process.exit(1);
    }
  });

program.parse(process.argv);


/**
 * This code was written by godieGH, this is the swazipen cli entry bin
 * 
 * @file
 * @author godieGH
 * @licence MIT
 */