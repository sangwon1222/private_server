const express = require('express');
const cors = require("cors");
import http from "http";
import { todoRouter } from "./routes/todo";
import { BlackSmithSocket } from "./socket/blackSmith";

const isProduction = process.env.NODE_ENV == "production";
const origin = isProduction ? 'http://lsw.kr' : '*'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( cors({origin}) )

app.use("/api/todo", todoRouter);
app.use("/", express.static("public"));

const port =  8000;

const server = http.createServer({}, app);
server.listen(port, () => {
  console.log(`listening at port ${port}`);
});

const socket = new BlackSmithSocket(server)
socket.connect()

