import { Server } from "socket.io";
import { getRoomActionCard, setRoomActionCard } from "../util/blackSmith";

const isProduction = process.env.NODE_ENV == "production";
const origin = isProduction ? 'http://lsw.kr' : '*'


export class BlackSmithSocket{
  private mSocket: Server
  private mRobyUsers:any
  private mRoomIndex: 0
  
  constructor(http:any){
    // const { clientsCount } = (io.engine as any)
    this.mSocket = new Server(http,{cors:{ origin,credentials:isProduction}})
    this.mRobyUsers = {}
    this.mRoomIndex = 0
  }
  

  connect(){
    this.mSocket.on("connection", async (socket) => {
      
      const userInfo = async () => {
        const sockets = await this.mSocket.fetchSockets();
        return sockets.map(({ id  }) => { 
          return { socketId: id } 
        })
      }
      

      this.mRobyUsers[socket.id] = true
      socket.data.roomName = '';
    
      socket.emit("welcome", {
        socketId: socket.id,
        users: userInfo(),
        clientsCount: (await userInfo()).length
      });

      socket.on("seach-user", async (cardDeck)=> {
        const sockets = await this.mSocket.fetchSockets();
        const roomName = `room${this.mRoomIndex}`
        socket.data.cardDeck = cardDeck
        socket.data.roomName = roomName
        
        socket.join(`room${this.mRoomIndex}`)

        const sidsAry = [...(socket.to(roomName) as any).adapter.sids]
        const totalUser = sidsAry.map((e)=>{
          const user = [...e[1]][0]
          const room = [...e[1]][1]
          return {user,room }
        })

        const roomUser = totalUser.filter((e)=>e.room===roomName)
        if(roomUser.length ===2 )this.mRoomIndex+=1

        let i=-1
        const test = sockets.find(() => { 
          i+=1
          return totalUser[i].user!= socket.id &&  totalUser[i].room === socket.data.roomName 
        })
        
        const searchUser = test?.id 
        const searchUserDeck = test?.data?.cardDeck 

        if(roomUser.length ===2){
          socket.data.actionCard= await getRoomActionCard(roomName)
          socket.data.master= true
          socket.emit('recieve-seach-user',{
            me:socket.id,
            myDeck:socket.data.cardDeck,
            other:searchUser,
            otherDeck: searchUserDeck
          })
          
          socket.to(roomName).emit('recieve-seach-user',{
            me:socket.id,
            myDeck:socket.data.cardDeck,
            other:searchUser,
            otherDeck: []
          })
        }
      });

      socket.on("insert-room", async ()=> {
        const roomName = `room${this.mRoomIndex}`
        socket.data.roomName = roomName;
        socket.join(roomName)
      })

      socket.on("get-action-card", async ()=> {
        const sockets = await this.mSocket.fetchSockets();
        const roomName = socket.data.roomName
        const sidsAry = [...(socket.to(roomName) as any).adapter.sids]
        const totalUser = sidsAry.map((e)=>{
          const user = [...e[1]][0]
          const room = [...e[1]][1]
          return {user,room }
        })
        let i = -1
        const roomUser = sockets.filter(()=>{
          i+=1
          return totalUser[i].room === roomName 
        })
        const masterSocket = roomUser.find((e)=> e.data.master===true)
        const card = masterSocket.data.actionCard.splice(0,5)
        console.log('id',masterSocket.id)
        console.log('roomName',masterSocket.data.roomName)
        console.log('actionCard',masterSocket.data.actionCard.length)
        
        socket.to(roomName).emit("get-action-card", {card})
      })

      socket.on("get-one-action-card", async ()=> {
        const sockets = await this.mSocket.fetchSockets();
        const roomName = socket.data.roomName
        const sidsAry = [...(socket.to(roomName) as any).adapter.sids]
        const totalUser = sidsAry.map((e)=>{
          const user = [...e[1]][0]
          const room = [...e[1]][1]
          return {user,room }
        })
        let i = -1
        const roomUser = sockets.filter(()=>{
          i+=1
          return totalUser[i].room === roomName 
        })
        const masterSocket = roomUser.find((e)=> e.data.master===true)
        const card = masterSocket.data.actionCard.splice(0,1)
        
        console.log('one',card,roomName)

        socket.emit("get-one-action-card", {card}) 
      })
      
    
    
      socket.on("leave-user", async () => {
        const users = await userInfo()
        let clientsCount = 0
        for(const user of users){
          if(user.socketId!==socket.id)clientsCount +=1
        }

        socket.broadcast.emit("leave-user", {
          socketId: socket.id,
          clientsCount
        });
      });

      socket.on("disconnect", async () => {
        socket.leave(socket.data.roomName)
        for (const room of socket.rooms) {
          if (room !== socket.id) {
            socket.to(room).emit("leave-user", socket.id);
          }
        }

        socket.broadcast.emit("leave-user", {
          socketId: socket.id,
          clientsCount: (await userInfo()).length
        });
      });
    });
  
    this.mSocket.listen(3000);
  }
}



