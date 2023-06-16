import { actionCards } from "../util/blackSmith";
import { Server } from "socket.io";

const isProduction = process.env.NODE_ENV == "production";
const origin = isProduction ? 'http://lsw.kr' : '*'


export class BlackSmithSocket{
  private mSocket: Server
  private mRobyUsers:any
  
  constructor(http:any){
    // const { clientsCount } = (io.engine as any)
    this.mSocket = new Server(http,{cors:{ origin,credentials:isProduction}})
    this.mRobyUsers = {}
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
      socket.data.server = 0;
      socket.data.ready = false
      socket.data.card=()=>actionCards;
    
      socket.emit("welcome", {
        socketId: socket.id,
        users: userInfo(),
        cards: socket.data.card(),
        clientsCount: (await userInfo()).length
      });

      socket.broadcast.emit("incomming-user", {
        socketId: socket.id,
        clientsCount: (await userInfo()).length
      });

      socket.on("seach-user", async (cardDeck)=> {
        const sockets = await this.mSocket.fetchSockets();
        socket.data.cardDeck = cardDeck
        socket.data.ready = true
        
        let searchUser = null
        let searchUserDeck = null

        for(const {id,data} of sockets){
          const condition = data.ready && id !== socket.id
          if(condition) {
            searchUser = id
            searchUserDeck = data.cardDeck
            break
          }
        }

        socket.join(`room1`)
        
        if(searchUser && socket.id!==searchUser){
          socket.data.ready = false
          
          this.mRobyUsers[socket.id] = false
          console.log(socket.id)

          socket.emit('recieve-seach-user',{
            me:socket.id,
            myDeck:socket.data.cardDeck,
            other:searchUser,
            otherDeck: searchUserDeck
          })
          socket.to(`room1`).emit('recieve-seach-user',{
            me:socket.id,
            myDeck:socket.data.cardDeck,
            other:searchUser,
            otherDeck: searchUserDeck
          })
        }
      });

      socket.on("get-action-card", async ()=> {
        socket.to('room1').emit("get-action-card", {
          //
        })
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



