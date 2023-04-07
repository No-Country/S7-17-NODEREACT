const { authenticateRoom } = require("../middlewares/auth.middleware");
const { Room_Match, User, Question, User_Advantage } = require("../models");
const getRandom = require("../utils/getRandom.js");
const dataRoom = {
  questions: getRandom(10),
  player1: {
    correctAnswers: 0,
    incorrectAnswers: 0,
    points: 0,
    hammer: 0,
    magicWand: 0
  },
  player2: {
    correctAnswers: 0,
    incorrectAnswers: 0,
    points: 0,
    hammer: 0,
    magicWand: 0
  }
};

class RoomServices {
  static async createRoomSolitary({ userId }) {
    try {
      const newRoom = {
        userId,
        dataRoom: {
          questions: dataRoom.questions,
          player: dataRoom.player1
        },
        status: "playing",
        typeGame: "solitary"
      };
      const result = await Room_Match.create(newRoom);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async createRoomFriend({ userId, opponentUserId, token }) {
    try {
      const { socketId } = await User.findByPk(opponentUserId);
      if (!authenticateRoom(token)) return { socketId, data: { message: "No token provided" } };

      const newRoom = {
        userId,
        opponentUserId,
        typeGame: "friends",
        dataRoom
      };
      const roomCreated = await Room_Match.create(newRoom);
      return { socketId, data: roomCreated };
    } catch (error) {
      throw error;
    }
  }
  static async createRoomRandom({ userId }) {
    try {
      //Primero buscamos una lista de salas disponibles
      const roomAvailable = await Room_Match.findAll({
        where: { typeGame: "random", status: "waiting" }
      });

      //Si exísten salas disponibles se ejecuta el siguiente código
      if (roomAvailable.length >= 1) {
        //A continuación seleccionamos de manera aleatoria una sala disponible
        const randomIndex = Math.floor(Math.random() * roomAvailable.length);
        const roomSelected = roomAvailable[randomIndex];

        //Cambiamos el estado de "esperando" a "jugando" y agregamos el usuario como oponente.
        roomSelected.status = "playing";
        roomSelected.opponentUserId = userId;

        //Guardamos la actualización en la base de datos
        await Room_Match.update(
          { status: "playing", opponentUserId: userId },
          { where: { id: roomSelected.id } }
        );

        //Buscamos el socket ID del usuario creador de la sala
        const { socketId } = await User.findByPk(roomSelected.userId);

        return { id: 1, socketId, data: roomSelected };

        //Si NO exísten salas disponibles se ejecuta el siguiente código
      } else {
        //Creamos la base para una sala en espera de jugadores
        const newRoom = {
          userId,
          dataRoom
        };

        //Validacions de seguridad, Verificamops que una sala con las mismas caracteristicas no exista
        const room = await Room_Match.findOne({
          where: { userId, satus: "waiting", typeGame: "random" }
        });

        //Generamos la sala en la base de datos
        const roomCreated = await Room_Match.create(newRoom);

        return { id: 2, socketId, data: roomCreated };
      }
    } catch (error) {
      throw error;
    }
  }
  static async getRoomById(id) {
    try {
      if (!id) throw "Id is not found";
      const result = await Room_Match.findByPk(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getRooms() {
    try {
    } catch (error) {
      throw error;
    }
  }
  static async updateRoomSolitary(id, dataPlayer) {
    try {
      const room = await Room_Match.findByPk(id);
      const user = await User.findByPk(room.userId);
      const hammer = await User_Advantage.findOne({ where: { advantageId: 1 } });
      const magicWand = await User_Advantage.findOne({ where: { advantageId: 2 } });
      const updateRoom = {
        dataRoom: {
          questions: room.dataRoom.questions,
          player: { ...dataPlayer }
        },
        status: "finished"
      };
      const promise = [
        Room_Match.update({ ...updateRoom }, { where: { id } }),
        User.update({ points: user.points + dataPlayer.points }, { where: { id: user.id } }),
        User_Advantage.update(
          { quantity: hammer.quantity - dataPlayer.hammer },
          { where: { userId: user.id, advantageId: 1 } }
        ),
        User_Advantage.update(
          { quantity: magicWand.quantity - dataPlayer.magicWand },
          { where: { userId: user.id, advantageId: 2 } }
        )
      ];

      await Promise.all(promise);
      return { message: "Updated successfull" };
    } catch (error) {
      throw error;
    }
  }
  static async deleteRoom(id) {
    try {
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RoomServices;
