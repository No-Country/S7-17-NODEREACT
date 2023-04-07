const { authenticateRoom } = require("../middlewares/auth.middleware");
const { Room_Match, User, User_Advantage } = require("../models");
const getRandomQuestions = require("../utils/randomQuestions.js");

class RoomServices {
  static async createRoomSolitary({ userId }) {
    try {
      const selectedQuestions = getRandomQuestions();

      const newRoom = {
        userId,
        dataRoom: {
          questions: [...selectedQuestions],
          player: {
            correctAnswers: 0,
            incorrectAnswers: 0,
            points: 0,
            advantages: 0
          }
        },
        status: "gaming",
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
      if (!authenticateRoom(token)) throw "No token provided";

      const selectedQuestions = getRandomQuestions();

      const newRoom = {
        userId,
        opponentUserId,
        typeGame: "friends",
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

      const { socketId } = await User.findByPk(opponentUserId);
      const roomCreated = await Room_Match.create(newRoom);
      return { socketId, data: roomCreated };
    } catch (error) {
      throw error;
    }
  }
  static async createRoomRandom({ userId }) {
    try {
      const roomAvailable = await Room_Match.findAll({
        where: { typeGame: "random", status: "waiting" }
      });

      const selectedQuestions = getRandomQuestions();

      if (roomAvailable.length >= 1) {
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
        return roomCreated;
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

      return { message: "Room updated successfully" };
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
