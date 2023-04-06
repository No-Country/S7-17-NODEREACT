const { User } = require("./models");
const { createRoomFriend, createRoomRandom } = require("./services/room.services");

module.exports = io => {
  io.on("connection", socket => {
    console.log("User connected to socket server");

    /* Almacenamos  */

    socket.on("login", id => {
      User.update({ socketId: socket.id, online: true }, { where: { id } });
    });

    /* Escuchamos el evento socket invitar frined */

    socket.on("invitar friend", async data => {
      const result = await createRoomFriend(data);

      io.to(result.socketId).emit("invite", result.data);
    });

    socket.on("invitar random", async data => {
      const result = await createRoomRandom(data);
      console.log(result);
      socket.broadcast.emit("invite", result);
    });

    socket.on("disconnect", socket => {
      console.log("User disconnected from socket server");
      User.update({ online: false }, { where: { socketId: socket.id } });
    });
  });
};
