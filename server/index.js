import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "dotenv/config";

import apiRoutes from "./routes/api.js";

const PORT = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log("SwaziPen server started at port: 5000....");
});