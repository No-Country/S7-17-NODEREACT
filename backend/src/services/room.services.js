const sequelize = require("sequelize");
const { authenticateRoom } = require("../middlewares/auth.middleware");
const { Room_Match, User, Question, User_Advantage, User_Achievement } = require("../models");
const getRandom = require("../utils/randomQuestions.js");
const getUserTotalAnswers = require("../utils/getUserTotalAswers");
const getValidationsAchivements = require("../utils/validationAchivement");
const dataRoom = {
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
      if (!userId) throw "No hay datos para continuar";
      dataRoom["questions"] = await getRandom(10);
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
      //Buscamos una sala en espera con los mismos datos
      const roomEsxistent = await Room_Match.findOne({
        where: { userId, opponentUserId, status: "playing" }
      });

      //Si existe una sala, en espera, igual a la que se quiere crear retornamos un mensaje al creador
      if (roomEsxistent) return { id: 1, data: { message: "Ya existe una sala " } };

      //Valídamos si el creador está autorizado, con el token
      if (!authenticateRoom(token))
        return { id: 1, socketId, data: { message: "No token provided" } };

      //Agregamos 10 preguntas aleatorias a los datos de la sala
      dataRoom["questions"] = await getRandom(10);

      //Creamos la base para la sala
      const newRoom = {
        userId,
        opponentUserId,
        typeGame: "friends",
        dataRoom
      };

      //Buscamos el socket ID del usuario retado
      const { socketId } = await User.findByPk(opponentUserId);

      //Finalmente creamos en la base de datos esta sala y retornamos el resultado al evento feedback
      const roomCreated = await Room_Match.create(newRoom);
      return { id: 2, socketId, data: roomCreated };
    } catch (error) {
      throw error;
    }
  }
  static async createRoomRandom({ userId, token }) {
    try {
      //Valídamos si el creador está autorizado, con el token
      if (!authenticateRoom(token))
        return { id: 1, socketId, data: { message: "No token provided" } };

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
        dataRoom["questions"] = await getRandom(10);
        //Creamos la base para una sala en espera de jugadores
        const newRoom = {
          userId,
          dataRoom
        };

        //Validacions de seguridad, Verificamops que una sala con las mismas caracteristicas no exista
        const room = await Room_Match.findOne({
          where: { userId, status: "waiting", typeGame: "random" }
        });

        //Generamos la sala en la base de datos
        const roomCreated = await Room_Match.create(newRoom);

        return { id: 2, data: roomCreated };
      }
    } catch (error) {
      throw error;
    }
  }
  static async acceptRoom(id) {
    try {
      const promises = [
        Room_Match.update({ status: "playing" }, { where: { id, status: "waiting" } }),
        Room_Match.findByPk(id, { attributes: { exclude: ["opponent_user_id", "user_id"] } })
      ];
      const promisesAll = await Promise.all(promises);

      if (promisesAll[1].status === "refused") {
        return { id: 1, data: { message: "Se agoto el tiempo de espera" } };
      } else {
        const { socketId } = await User.findByPk(promisesAll[1].userId);
        promisesAll[1].status = "playing";
        return { id: 2, socketId, data: promisesAll[1] };
      }
    } catch (error) {
      throw error;
    }
  }
  static async refuseRoom(id) {
    try {
      const promises = [
        Room_Match.update({ status: "refused" }, { where: { id, status: "waiting" } }),
        Room_Match.findByPk(id, { attributes: { exclude: ["opponent_user_id", "user_id"] } })
      ];
      const promisesAll = await Promise.all(promises);

      console.log(promisesAll[1]);

      if (promisesAll[1].status === "playing" || promisesAll[1].status === "finished") {
        return { id: 1, data: { message: "Juego en curso o finalizado" } };
      } else {
        const { socketId } = await User.findByPk(promisesAll[1].userId);
        promisesAll[1].status = "refused";
        return { id: 2, socketId, data: promisesAll[1] };
      }
    } catch (error) {
      throw error;
    }
  }
  static async getRoomById(id) {
    try {
      if (!id) throw "Id not found";

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

      const updateRoom = {
        dataRoom: {
          questions: room.dataRoom.questions,
          player: { ...dataPlayer }
        },
        status: "finished"
      };

      const promise = [
        Room_Match.update({ ...updateRoom }, { where: { id } }),
        User.update(
          { points: sequelize.literal(`points + ${dataPlayer.points}`) },
          { where: { id: user.id } }
        ),
        User_Advantage.update(
          { quantity: sequelize.literal(`quantity - ${dataPlayer.hammer}`) },
          { where: { userId: user.id, advantageId: 1 } }
        ),
        User_Advantage.update(
          { quantity: sequelize.literal(`quantity - ${dataPlayer.magicWand}`) },
          { where: { userId: user.id, advantageId: 2 } }
        )
      ];

      await Promise.all(promise);

      return { message: "Room updated successfully" };
    } catch (error) {
      throw error;
    }
  }
  static async updateRoomGroup(id, { player1, player2 }) {
    try {
      const room = await Room_Match.findByPk(id);
      const promises = [
        User.findByPk(room.userId),
        User.findByPk(room.opponentUserId),
        User_Achievement.findAll({
          where: { userId: room.userId },
          attributes: ["achievementId", "userId"] }),
        User_Achievement.findAll({
          where: { userId: room.opponentUserId },
          attributes: ["achievementId", "userId"]
        })
      ];
      const promisesAll = await Promise.all(promises);

      const dataRoom = {
        questions: room.dataRoom.questions,
        player1,
        player2
      };

      const valor1 = await getUserTotalAnswers(promisesAll[0].id);
      const valor2 = await getUserTotalAnswers(promisesAll[1].id);
      const coinsPromises = [
        getValidationsAchivements(valor1, promisesAll[2], room.userId),
        getValidationsAchivements(valor2, promisesAll[3], room.opponentUserId)
      ];

      const coins = await Promise.all(coinsPromises);

      const updatePromises = [
        Room_Match.update({ dataRoom, status: "finished" }, { where: { id } }),
        User.update(
          { points: sequelize.literal(`points + ${player1.points}`), coins: sequelize.literal(`coins + ${coins[0]}`) },
          { where: { id: promisesAll[0].id } }
        ),
        User.update(
          { points: sequelize.literal(`points + ${player2.points}`), coins: sequelize.literal(`coins + ${coins[1]}`) },
          { where: { id: promisesAll[1].id } }
        ),
        User_Advantage.update(
          { quantity: sequelize.literal(`quantity - ${player1.hammer}`) },
          { where: { userId: promisesAll[0].id, advantageId: 1 } }
        ),
        User_Advantage.update(
          { quantity: sequelize.literal(`quantity - ${player1.magicWand}`) },
          { where: { userId: promisesAll[0].id, advantageId: 2 } }
        ),
        User_Advantage.update(
          { quantity: sequelize.literal(`quantity - ${player2.hammer}`) },
          { where: { userId: promisesAll[1].id, advantageId: 1 } }
        ),
        User_Advantage.update(
          { quantity: sequelize.literal(`quantity - ${player2.magicWand}`) },
          { where: { userId: promisesAll[1].id, advantageId: 2 } }
        )
      ];
      
      await Promise.all(updatePromises);
      
      return { message: "Partida finalizada" };
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
