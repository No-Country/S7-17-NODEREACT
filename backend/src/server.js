const app = require("./app");
const sockeIO = require("socket.io");
const http = require("http");
const swaggerDocs = require("../swagger");
const { createRoomFriend, createRoomRandom } = require("./services/room.services");
const { User } = require("./models");
require("dotenv").config();

const server = http.createServer(app);
const io = sockeIO(server, {
  cors: {
    origin: "*"
  }
});

app.set("io", io);

let socketsId = [];

io.on("connection", socket => {
  console.log("User connected to socket server");
  socketsId.push(socket.id);
  //console.log(socket.id)
  //console.log(socket);
  //console.log(io.sockets.sockets);

  socket.on("invitar", async data => {
    const result = await createRoomFriend(data);

    //console.log(result.socketId);

    //utilizando su ID
    const socketCurrent = io.sockets.sockets;
    const newSock = [];
    for (const sock of socketCurrent) {
      console.log(sock[0]);
      newSock.push(sock[0]);
    }
    if (newSock.includes(result.socketId)) {
      let i = null;
      newSock.forEach((item, index) => {
        if (item === result.socketId) i = index;
      });

      io.to(newSock[i]).emit("invite", result);
      
    }

    //socket.broadcast.emit("invite", result);
  });

  socket.on("login", id => {
    //console.log(socket.id);
    User.update({ socketId: socket.id }, { where: { id } });
  });

  socket.on("invitar random", async data => {
    const result = await createRoomRandom(data);
    console.log(result);
    socket.broadcast.emit("invite", result);
  });

  socket.on("disconnect", socket => {
    const newSocketsId = socketsId.filter(item => item !== socket.id);
    socketsId = newSocketsId;
    console.log("User disconnected from socket server");
  });
});

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  swaggerDocs(app, PORT);
});
