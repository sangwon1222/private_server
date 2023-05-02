import { Server } from "socket.io";
import express from "express";
import {
  TypeSetBomb,
  mapData,
  TypePosType,
  TypeDoubleNumberObject,
} from "./type";
import cors = require("cors");
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true,
};

import fs from "fs";
import http from "http";
import https from "https";
import "dotenv/config";

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static("public"));

if (process.env.NODE_ENV === "production") {
  const KEY_URL = process.env.KEY_URL;
  const options = {
    key: fs.readFileSync(`${KEY_URL}/privkey.pem`),
    cert: fs.readFileSync(`${KEY_URL}/cert.pem`),
    ca: fs.readFileSync(`${KEY_URL}/chain.pem`),
  };
  // https 서버를 생성합니다.
  // key 파일 옵션과 라우팅 정보 등이 들어있는 app을 함께 넘깁니다.
  // https 포트 번호는 443입니다.
  https.createServer(options, app).listen(443, () => {
    console.log(`listening at port 443`);
  });

  // set up a route to redirect http to https
  // https://stackoverflow.com/questions/7450940/automatic-https-connection-redirect-with-node-js-express
  http.createServer((req, res) => {
    res.writeHead(301, {
      Location: "https://" + req.headers["host"] + req.url,
    });
    res.end();
  });
} else {
  app.listen(403, () => {
    console.log(`dev --port : 403`);
  });
}

const io = new Server(3000, {
  cors: corsOptions,
});

io.on("connection", async (socket) => {
  socket.data.tileScale = 50;
  socket.data.pos = [1, 1];
  socket.data.status = "wait";
  socket.data.bombMapData = Array.from({ length: 16 }, () =>
    Array.from({ length: 24 }, () => 0)
  );
  const sockets = await io.fetchSockets();

  const userInfo = () =>
    sockets.map(({ id, data: { pos, status } }) => {
      return { socketId: id, pos, status };
    });

  const { pos } = socket.data;

  socket.emit("welcome", { socketId: socket.id, users: userInfo(), mapData });
  socket.broadcast.emit("incomingUser", { socketId: socket.id, pos });

  socket.on("setBomb", ({ bombPos }: TypeSetBomb) => {
    socket.emit("setBomb", { socketId: socket.id, bombPos });
    socket.broadcast.emit("setBomb", { socketId: socket.id, bombPos });
  });

  socket.on("fireBomb", ({ socketId, bombPos, fireScope }: TypeSetBomb) => {
    const firePos = [bombPos];
    socket.data.bombMapData[bombPos[1]][bombPos[0]] = socketId;
    const direction = [
      [+1, 0],
      [-1, 0],
      [0, +1],
      [0, -1],
    ];
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= fireScope; j++) {
        let [x, y] = direction[i];
        x = bombPos[0] + x * j;
        y = bombPos[1] + y * j;
        if (x >= 0 && y >= 0) {
          if (mapData[y][x] === 1) {
            break;
          }
          if (mapData[y][x] != 1) {
            firePos.push([x, y]);
            socket.data.bombMapData[y][x] = socketId;
          }
        }
      }
    }

    checkDeathUser();
    socket.emit("fireBomb", { firePos });
    socket.broadcast.emit("fireBomb", { firePos });
  });

  const checkDeathUser = () => {
    const users = userInfo();
    const keys = Object.keys(users);
    const deathUsers = [];
    for (let i = 0; i < keys.length; i++) {
      const [x, y] = users[i].pos;
      const killer = socket.data.bombMapData[y][x];
      if (killer !== 0) {
        deathUsers.push({ killer, death: users[i].socketId });
      }
    }
    socket.emit("deathUser", { info: deathUsers });
    socket.broadcast.emit("deathUser", { info: deathUsers });
  };
  socket.on("checkDeathUser", () => checkDeathUser());

  socket.on("endBomb", ({ firePos }: TypeDoubleNumberObject) => {
    for (let i = 0; i < firePos.length; i++) {
      const x = firePos[i][0];
      const y = firePos[i][1];
      if (socket.data.bombMapData[y][x] === socket.id) {
        socket.data.bombMapData[y][x] = 0;
      }
    }
  });

  socket.on("moveReq", ({ pos, status }: TypePosType) => {
    const x = pos[0] / socket.data.tileScale;
    const y = pos[1] / socket.data.tileScale;
    socket.data.pos = [x, y];
    socket.data.status = status;

    socket.emit("move", { socketId: socket.id, pos, status });
    socket.broadcast.emit("move", { socketId: socket.id, pos, status });

    checkDeathUser();
  });

  socket.on("disconnect", () => {
    socket.emit("leaveUser", { socketId: socket.id });
    socket.broadcast.emit("leaveUser", { socketId: socket.id });
  });
});
