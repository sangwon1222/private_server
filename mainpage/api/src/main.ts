import * as http from "http";
import express from "express";
import { initSocketIOServer } from "./socketIOServer";
import authRouter from "./routes/auth";

import api from "./routes";
import cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @description client
 */
app.use("/", express.static("public"));

/**
 * @description route => api
 */
app.use("/api", api);
// app.use("/api", api);

/**
 * @description route => auth
 */
app.use("/api/auth", authRouter);

const port = 8000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.json({ res: "mainpage_api" });
});

app.use("*", express.static("public"));

const server = http.createServer(app);
initSocketIOServer(server);

server.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});

console.log(process.env.NODE_ENV);
