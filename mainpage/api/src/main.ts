import { Server } from "socket.io";
const express = require('express');
const cors = require("cors");
import http from "http";
import { todoRouter } from "./routes/todo";

const isProduction = process.env.NODE_ENV == "production";

const origin = isProduction ? 'http://lsw.kr' : '*'
const corsOptions = { origin,  credentials: true };
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( cors({origin}) )

app.use("/api/todo", todoRouter);
app.use("/", express.static("public"));


const port = isProduction ?  1234: 8000;

const server = http.createServer({}, app);
server.listen(port, () => {
  console.log(`listening at port ${port}`);
});

const io = new Server(server, {
  cors: corsOptions,
});

const shuffle =(ary: any[])=>{
  const backupAry:readonly any[]= ary
  const {length} = backupAry
  for(let i=0;i<length;i++ ){
    const random1 = Math.floor(Math.random()*length)
    const random2 = Math.floor(Math.random()*length)
    const backup1 = backupAry[random1]
    const backup2 = backupAry[random2]
    ary[random1] = backup2
    ary[random2] = backup1
  }
  return ary
}
const elements = [ "fire", "water", "air", "electric", "plant"]

const cardSet =(setCount: number)=>{
  const result = []
  for(let i=0; i<setCount;i++){
    for(const element of elements){
      result.push(
        ...Array(10).fill(null).map((_v,i)=>{return {element,attack:i+1,defence:0}})
      )
    }
  }
  return result
}

const actionCards:readonly any[] = shuffle([
  ...cardSet(4),
  ...Array(10).fill(null).map((_v,i)=>{return {element:'all',attack:0,defence:i+1}}),
])

let roomIndex = 1;
io.on("connection", async (socket) => {
  const sockets = await io.fetchSockets();
  const userInfo = () =>
    sockets.map(({ id  }) => {
      return { socketId: id };
    });


    // ['fire', 'water', 'air', 'electric', 'plant'];
  socket.join(`room${roomIndex}`);
  socket.data.server = roomIndex;
  
  socket.data.card=()=>actionCards;
  console.log(socket.data.card())

  const { clientsCount } = (io.engine as any)


  socket.emit("welcome", {
    socketId: socket.id,
    users: userInfo(),
    cards: socket.data.card(),
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
