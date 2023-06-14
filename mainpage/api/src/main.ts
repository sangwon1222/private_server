import { Server } from "socket.io";
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
const port = isDevMode ? 8000 : 1234;

const server = http.createServer({}, app);
server.listen(port, () => {
  console.log(`listening at port ${port}`);
});

const io = new Server(server, {
  cors: corsOptions,
});

let roomIndex = 1;
io.on("connection", async (socket) => {
  const sockets = await io.fetchSockets();
  const userInfo = () =>
    sockets.map(({ id  }) => {
      return { socketId: id };
    });


  socket.join(`room${roomIndex}`);
  socket.data.tileScale = 50;
  socket.data.pos = [1, 1];
  socket.data.status = "wait";
  socket.data.server = roomIndex;

  const { clientsCount } = (io.engine as any)
  socket.emit("welcome", {
    socketId: socket.id,
    users: userInfo(),
    clientsCount
  });
  socket.broadcast.emit("incomming-user", {
    socketId: socket.id,
    clientsCount
  });


  socket.on("disconnecting", () => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit("leave-user", socket.id);
      }
    }
    socket.broadcast.emit("leave-user", {
      socketId: socket.id,
      clientsCount: (io.engine as any).clientsCount,
    });
  });
});

io.listen(3000);
