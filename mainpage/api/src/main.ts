import { Server } from "socket.io";
const express = require('express');
const cors = require("cors");
import http from "http";
import { todoRouter } from "./routes/todo";
import { shuffle } from "./util";

const isProduction = process.env.NODE_ENV == "production";

const origin = isProduction ? 'http://lsw.kr' : '*'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( cors({origin:'*'}) )

app.use("/api/todo", todoRouter);
app.use("/", express.static("public"));

const port =  8000;

const server = http.createServer({}, app);
server.listen(port, () => {
  console.log(`listening at port ${port}`);
});

console.log({origin})
console.log({credentials: isProduction})
const io = new Server(server, {
  cors: { 
    origin,
    allowedHeaders: ["my-custom-header"],
    credentials: isProduction
  },
});


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


  socket.join(`room${roomIndex}`);
  socket.data.server = roomIndex;
  
  socket.data.card=()=>actionCards;
  // const { clientsCount } = (io.engine as any)


  socket.emit("welcome", {
    socketId: socket.id,
    users: userInfo(),
    cards: socket.data.card(),
    clientsCount:userInfo().length
  });
  socket.broadcast.emit("incomming-user", {
    socketId: socket.id,
    clientsCount:userInfo().length
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
