const { authenticateRoom } = require("../middlewares/auth.middleware");
const { Room_Match, User, Question } = require("../models");
const getRandom = require("../utils/getRandom.js");

class RoomServices {
  static async createRoomSolitary(userId) {
    try {
      const questions = await Question.findAll();
      const selectedQuestions = getRandom(questions, 10);
      const newRoom = {
        userId,
        dataRoom: {
          questions: [...selectedQuestions],
          player: {
            correctAnswers: 0,
            incorrectAnswers: 0,
            points: 0,
            advantages: 0
          },
          status: "gaming",
          typeGame: "solitary"
        }
      };
      const result = await Room_Match.create(newRoom);
      return result;
    } catch (error) {}
  }
  static async createRoomFriend({ userId, opponentUserId, token }) {
    try {
      if (authenticateRoom(token)) {
        const questions = await Question.findAll();

        const newRoom = {
          userId,
          opponentUserId,
          typeGame: "friends",
          dataRoom: {
            questions: getRandom(questions, 10),
            player1: {
              correctAnswers: 0,
              incorrectAnswers: 0,
              points: 0,
              advantages: 0
            },
            player2: {
              correctAnswers: 0,
              incorrectAnswers: 0,
              points: 0,
              advantages: 0
            }
          }
        };
        const roomCreated = await Room_Match.create(newRoom);
        const user = await User.findByPk(opponentUserId);
        //console.log(user)
        return { roomCreated, socketId: user.socketId };
      }
    } catch (error) {
      throw error;
    }
  }
  static async createRoomRandom({ userId }) {
    try {
      const roomAvailable = await Room_Match.findAll({
        where: { typeGame: "random", status: "waiting" }
      });
      const questions = await Question.findAll();
      const selectedQuestions = getRandom(questions, 10);
      if (roomAvailable.length >= 1) {
        console.log("hi1");
        const randomIndex = Math.floor(Math.random() * roomAvailable.length);
        const roomSelected = roomAvailable[randomIndex];
        roomSelected.status = "gaming";
        roomSelected.opponentUserId = userId;
        await Room_Match.update(
          { status: "gaming", opponentUserId: userId },
          { where: { id: roomSelected.id } }
        );

        return roomSelected;
      } else {
        console.log("hi2");
        const newRoom = {
          userId,
          dataRoom: {
            questions: [...selectedQuestions],
            player1: {
              correctAnswers: 0,
              incorrectAnswers: 0,
              points: 0,
              advantages: 0
            },
            player2: {
              correctAnswers: 0,
              incorrectAnswers: 0,
              points: 0,
              advantages: 0
            }
          }
        };

        const roomCreated = await Room_Match.create(newRoom);

        //io.to().emit("invite", roomCreated);
        return roomCreated;
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
  static async updateRoom(id, updatedRoom) {
    try {
      await Room_Match.update(updatedRoom, { where: { id } });
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

/* // Espera la respuesta del oponente
            const { accepted } = await new Promise(resolve => {
              // Crea un listener para la respuesta del oponente
              io.to(socketId).once("response", ({ accepted }) => {
                resolve({ accepted });
              });
      
              // Configura un timeout de 30 segundos para la respuesta del oponente
              setTimeout(() => {
                resolve({ accepted: false });
              }, 30000);
            });
      
            // Si el oponente acepta, crea la sala y envía la respuesta al usuario que la inició
            if (accepted) {
              const questions = await Question.findAll();
              const selectedQuestions = getRandomQuestions(questions, 10);
      
              const newRoom = {
                userId,
                opponentUserId,
                dataRoom: {
                  questions: selectedQuestions,
                  player1: {
                    correctAnswers: 0,
                    incorrectAnswers: 0,
                    points: 0,
                    advantages: 0
                  },
                  player2: {
                    correctAnswers: 0,
                    incorrectAnswers: 0,
                    points: 0,
                    advantages: 0
                  }
                },
                status: "gaming",
                typeGame: "friends"
              };
      
              const roomCreated = await Room_Match.create(newRoom);
      
              io.to(userId).emit("roomCreated");
              return roomCreated;
            } else {
              // Si el oponente rechaza, envía una notificación al usuario que la inició
              const roomRefused = {
                userId,
                opponentUserId,
                status: "refused",
                typeGame: "friends"
              };
      
              const roomCreated = await RoomMatch.create(roomRefused);
      
              io.to(userId).emit("roomRefused");
              return roomCreated;
            } */
