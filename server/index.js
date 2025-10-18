import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import http from "http";
import path from "path";
import {fileURLToPath} from "url";
import { Server as IOServer } from "socket.io";
import "dotenv/config";
import scanProject from "../src/scanner.js";
import chalk from "chalk";

import apiRoutes from "./routes/api.js";
import attachTerminalHandlers from "./terminal.js"; // new

let PORT = process.env.PORT || 5000;
const app = express();

app.use(
   express.json({
      limit: "100mb"
   })
);
app.use(cors());
app.use(helmet());

const __public = path.join(path.dirname(fileURLToPath(import.meta.url)), "public")
const __docs = path.join(path.dirname(fileURLToPath(import.meta.url)), "docs")
app.use(express.static(__public))
app.use("/docs", express.static(__docs))

function startServer(
   initialFileTree,
   prt = PORT,
   scannedWD,
   watcher,
   options = {}
) {
   PORT = prt;
   const { quiet, compilerPath } = options; // compilerPath is now supported

   if (!quiet) app.use(morgan("dev"));

   // create HTTP server from express app
   const server = http.createServer(app);

   // initialize socket.io
   const io = new IOServer(server, {
      cors: {
         origin: "*",
         methods: ["GET", "POST"]
      }
   });

   // make io accessible from routes if needed
   app.set("io", io);

   // when a client connects, send the current tree wrapped the same way your API does
   io.on("connection", socket => {
      //console.log("Socket connected:", socket.id);

      // Emit shape identical to your API response: { filetree: [ initialFileTree ] }
      socket.emit("filetree:init", { filetree: [initialFileTree] });

      // attach terminal handlers for this socket (node-pty)
      try {
         // pass compilerPath so terminal spawns use the provided executable
         attachTerminalHandlers(socket, scannedWD, compilerPath);
      } catch (err) {
         console.error("Failed to attach terminal handlers:", err);
      }

      socket.on("filetree:requestRefresh", async () => {
         try {
            const tree = await scanProject(scannedWD);
            initialFileTree = tree;
            // emit in the same shape as the API
            socket.emit("filetree:update", { filetree: [tree] });
         } catch (err) {
            socket.emit("filetree:error", {
               message: "Refresh failed",
               error: "" + err
            });
         }
      });

      socket.on("disconnect", reason => {
         //console.log("Socket disconnected:", socket.id, reason);
      });
   });

   // Debounce / coalesce flurry of watcher events:
   let scanScheduled = false;
   let isScanning = false;

   watcher.on("all", (evt, path) => {
      if (!scanScheduled) {
         scanScheduled = true;
         setTimeout(async () => {
            if (isScanning) {
               scanScheduled = false;
               return;
            }
            isScanning = true;
            try {
               const newTree = await scanProject(scannedWD);
               initialFileTree = newTree;

               // emit the updated tree in the same shape the API returns
               io.emit("filetree:update", { filetree: [newTree] });
               //console.log("Emitted filetree:update to clients");
            } catch (err) {
               io.emit("filetree:error", {
                  message: "Scan failed",
                  error: "" + err
               });
               console.error("scanProject failed:", err);
            } finally {
               isScanning = false;
               scanScheduled = false;
            }
         }, 100);
      }
   });

   // middleware to inject current tree and io on each request
   app.use(async (req, res, next) => {
      if (quiet) req.quiet = quiet;
      req.scannedWD = scannedWD;
      req.initialFileTree = initialFileTree;
      req.io = io;
      // expose compilerPath to request handlers (execute controller uses this)
      req.compilerPath = compilerPath;
      next();
   });

   app.use("/api", apiRoutes);

   server.listen(PORT, () => {
      console.log(
         chalk.green.bold("✔") +
            " " +
            chalk.cyan.bold("SwaziPen server started") +
            " at port: " +
            chalk.yellow.bold(PORT)
      );

      console.log(
         "  " +
            chalk.gray("Environment:") +
            " " +
            chalk.magenta.bold(process.env.NODE_ENV || "development")
      );

      console.log(
         "  " +
            chalk.gray("Local:") +
            "     " +
            chalk.blue.underline(`http://localhost:${PORT}`)
      );

      console.log(
         "  " +
            chalk.gray("API docs:") +
            "  " +
            chalk.blue.underline(`http://localhost:${PORT}/docs`)
      );

      console.log("  " + chalk.gray("Press CTRL‑C to shut down"));
   });

   return { server, io };
}

export default startServer;