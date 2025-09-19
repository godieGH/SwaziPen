import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "dotenv/config";

import apiRoutes from "./routes/api.js";
let PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json({
   limit: "100mb"
}))
// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

function startServer(initialFileTree, prt = PORT, scannedWD) {
   PORT = prt
   app.use((req, res, next) => {
      req.scannedWD = scannedWD;
      req.initialFileTree = initialFileTree;
      next()
   })
   
   app.use("/api", apiRoutes);

   app.listen(PORT, () => {
      console.log(`SwaziPen server started at port: ${PORT}`);
   });
}

export default startServer;
