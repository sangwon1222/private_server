// import { Server } from "socket.io";
const express = require('express');
const cors = require("cors");
import http from "http";
import { todoRouter } from "./routes/todo";


const corsOptions = { origin: "*",  credentials: true };
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( cors({origin:'*'}) )

app.use("/api/todo", todoRouter);
app.use("/", express.static("public"));

const isDevMode = process.env.NODE_ENV == "production";
// const port = isDevMode ? 8000 : 1234;
const port =8000;
app.listen(port, () => {
    console.log(`listening at port ${port}`);
  });




// const server = http.createServer({}, app);
// server.listen(8000, () => {
//   console.log(`listening at port 8000`);
// });

// const io = new Server(server, {
//   cors: corsOptions,
// });

// let roomIndex = 1;
// io.on("connection", async (socket) => {
//   socket.join(`room${roomIndex}`);
//   socket.data.tileScale = 50;
//   socket.data.pos = [1, 1];
//   socket.data.status = "wait";
//   socket.data.server = roomIndex;
//   socket.data.bombMapData = Array.from({ length: 16 }, () =>
//     Array.from({ length: 24 }, () => 0)
//   );

//   const sockets = await io.fetchSockets();

//   const userInfo = () =>
//     sockets.map(({ id, data: { pos, status } }) => {
//       return { socketId: id, pos, status };
//     });
//   const { pos } = socket.data;

//   socket.emit("welcome", {
//     socketId: socket.id,
//     users: userInfo(),
//     mapData,
//     clientsCount: (io.engine as any).clientsCount,
//   });
//   socket.broadcast.emit("incomingUser", {
//     socketId: socket.id,
//     pos,
//     clientsCount: (io.engine as any).clientsCount,
//   });

//   socket.on("setBomb", ({ bombPos }: TypeSetBomb) => {
//     socket.emit("setBomb", { socketId: socket.id, bombPos });
//     socket.broadcast.emit("setBomb", { socketId: socket.id, bombPos });
//   });

//   socket.on("fireBomb", ({ socketId, bombPos, fireScope }: TypeSetBomb) => {
//     const firePos = [bombPos];
//     socket.data.bombMapData[bombPos[1]][bombPos[0]] = socketId;
//     const direction = [
//       [+1, 0],
//       [-1, 0],
//       [0, +1],
//       [0, -1],
//     ];
//     for (let i = 0; i < 4; i++) {
//       for (let j = 1; j <= fireScope; j++) {
//         let [x, y] = direction[i];
//         x = bombPos[0] + x * j;
//         y = bombPos[1] + y * j;
//         if (x >= 0 && y >= 0) {
//           if (mapData[y][x] === 1) {
//             break;
//           }
//           if (mapData[y][x] != 1) {
//             firePos.push([x, y]);
//             socket.data.bombMapData[y][x] = socketId;
//           }
//         }
//       }
//     }

//     checkDeathUser();
//     socket.emit("fireBomb", { firePos });
//     socket.broadcast.emit("fireBomb", { firePos });
//   });

//   const checkDeathUser = () => {
//     const users = userInfo();
//     const keys = Object.keys(users);
//     const deathUsers = [];
//     for (let i = 0; i < keys.length; i++) {
//       const [x, y] = users[i].pos;
//       const killer = socket.data.bombMapData[y][x];
//       if (killer !== 0) {
//         deathUsers.push({ killer, death: users[i].socketId });
//       }
//     }
//     socket.emit("deathUser", { info: deathUsers });
//     socket.broadcast.emit("deathUser", { info: deathUsers });
//   };
//   socket.on("checkDeathUser", () => checkDeathUser());

//   socket.on("endBomb", ({ firePos }: TypeDoubleNumberObject) => {
//     for (let i = 0; i < firePos.length; i++) {
//       const x = firePos[i][0];
//       const y = firePos[i][1];
//       if (socket.data.bombMapData[y][x] === socket.id) {
//         socket.data.bombMapData[y][x] = 0;
//       }
//     }
//   });

//   socket.on("moveReq", ({ pos, status }: TypePosType) => {
//     const x = pos[0] / socket.data.tileScale;
//     const y = pos[1] / socket.data.tileScale;
//     socket.data.pos = [x, y];
//     socket.data.status = status;

//     socket.emit("move", { socketId: socket.id, pos, status });
//     socket.broadcast.emit("move", { socketId: socket.id, pos, status });

//     checkDeathUser();
//   });

//   // socket.on("disconnect", () => {
//   socket.on("disconnecting", () => {
//     for (const room of socket.rooms) {
//       if (room !== socket.id) {
//         socket.to(room).emit("user has left", socket.id);
//       }
//     }
//     socket.emit("leaveUser", {
//       socketId: socket.id,
//       clientsCount: (io.engine as any).clientsCount,
//     });
//     socket.broadcast.emit("leaveUser", {
//       socketId: socket.id,
//       clientsCount: (io.engine as any).clientsCount,
//     });
//   });
// });

// io.listen(3000);
