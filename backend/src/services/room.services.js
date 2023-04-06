const { authenticateRoom } = require("../middlewares/auth.middleware");
const { Room_Match, User, Question } = require("../models");
const getRandom = require("../utils/getRandom.js");

class RoomServices {
  static async createRoomSolitary({ userId }) {
    try {
      console.log("hi service", userId);
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
      const { socketId } = await User.findByPk(opponentUserId);
      if (!authenticateRoom(token)) {
        return {
          socketId,
          data: {
            message: "No token provided"
          }
        };
      }
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
      //console.log(user)
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
        User.update({ points: user.points + dataPlayer.points }, { where: { id: user.id } })
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
