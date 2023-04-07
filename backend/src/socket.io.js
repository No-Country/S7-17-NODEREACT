const { User } = require("./models");
const { createRoomFriend, createRoomRandom } = require("./services/room.services");

module.exports = io => {
  io.on("connection", socket => {
    console.log("User connected to socket server");

    /* Almacenamos el socket ID del cliente en el momento que hace login */

    socket.on("login", async id => {
      const user = await User.findByPk(id);
      if (user.id) User.update({ socketId: socket.id, online: true }, { where: { id } });
    });

    /* Escuchamos el evento socket invitar friend */

    socket.on("invitation friend", async data => {
      
      //Esperamos que a función createRoomFriend cree la sala de juego y retorne el socket ID del oponente
      const result = await createRoomFriend(data);
      
      //Emitimos un mensaje de invitacion al oponente con los datos de la sala
      io.to(result.socketId).emit("invite", result.data);
    });

    /* Escuchamos el evento socket invitación aleatoria */

    socket.on("invitation random", async data => {
      
      //Esperamos que a función createRoomRandom cree la sala de juego y retorne el socket ID del oponente aleatorio
      const result = await createRoomRandom(data);
      
      //Emitimos un mensaje de invitacion al oponente aleatorio con los datos de la sala
      io.to(result.socketId).emit("invite", result.data);
    });

    /* Escuchamos el evento socket cuando el usuario oponente acepta la invitacion*/

    socket.on("invitation accepted", async data => {
      //const result = await
    });

    /* Recibimos el evento cuando el usuario cierra secion*/

    socket.on("disconnect", () => {
      User.update({ online: false }, { where: { socketId: socket.id } });
    });
  });
};
