#!/usr/bin/env node

import path from "path"

import {program} from "commander"
import chalk from "chalk"

import pkg from '../package.json' with { type: 'json' };
import scanProject from "../src/scanner.js";
import startServer from "../server/index.js"
program
   .name('swazipen')
   .description(pkg.description)
   .version(pkg.version)

program
   .argument("<path>")
   .option("-p, --port <port>", 'server on custom port')
   .action(async (source, {port}) => {
      try {
      if(port) {
         port = parseInt(port)
         if(isNaN(port)) return console.error("invalid port")
      }
      const projectPath = path.resolve(source);
      console.log("Scanning", `${chalk.blue(path.basename(projectPath))} project...`)
      const fileTree = await scanProject(projectPath)
      if(fileTree) {
         console.log("\u2713  Finished Scanning..")
         startServer(fileTree, port, path.resolve(source))
      }
      } catch(err) {
         console.error(chalk.grey(err.message))
         process.exit()
      }
   })
   
program.parse(process.argv)