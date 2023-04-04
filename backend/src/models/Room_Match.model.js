const db = require("../utils/database");
const { DataTypes } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     RoomMatch:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the Game Room.
 *         userId:
 *           type: integer
 *           description: The User id of the Game Room.
 *         opponentUserId:
 *           type: integer
 *           description: The opponent Id of the Game Room.
 *         dataRoom:
 *           type: object
 *           description: The data of the Game Room.
 *           properties:
 *             questions:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Questions'
 *             player1:
 *               type: object
 *               properties:
 *                    correctAnswers:
 *                      type: integer
 *                      description: Total correct answers.
 *                    incorrectAnswers:
 *                      type: integer
 *                      description: Total incorrect answers.
 *                    points:
 *                      type: integer
 *                      description: Total points won.
 *                    advantages:
 *                      type: integer
 *                      description: Total advantages used.
 *             player2:
 *               type: object
 *               properties:
 *                    correctAnswers:
 *                      type: integer
 *                      description: Total correct answers.
 *                    incorrectAnswers:
 *                      type: integer
 *                      description: Total incorrect answers.
 *                    points:
 *                      type: integer
 *                      description: Total points won.
 *                    advantages:
 *                      type: integer
 *                      description: Total advantages used.
 *         status:
 *           type: string
 *           description: Status of the Room.
 *         typeGame:
 *           type: string
 *           description: Type Game of the Room.
 *       example:
 *         id: 1
 *         userId: 2
 *         opponentUserId: 4
 *         dataRoom:
 *           questions: []
 *           player1:
 *             correctAnswers: 5
 *             incorrectAnswers: 5
 *             points: 0
 *             advantages: 2
 *           player2:
 *             correctAnswers: 6
 *             incorrectAnswers: 4
 *             points: 20
 *             advantages: 2
 *         status: 'waiting'
 *         typeGame: 'random'
 *     CreateRoom:
 *       required:
 *         - userId
 *       properties:
 *         userId:
 *           type: integer
 *           description: The User id of the Game Room.
 *       example:
 *         userId: 2
 *     CreateRoomFriend:
 *       required:
 *         - userId
 *         - opponentUserId
 *       properties:
 *         userId:
 *           type: integer
 *           description: The User id of the Game Room.
 *         opponentUserId:
 *           type: integer
 *           description: The opponent Id of the Game Room.
 *       example:
 *         userId: 2
 *         opponentUserId: 4
 *     UpdateRoomSolitary:
 *       properties:
 *         player:
 *           type: object
 *           properties:
 *                correctAnswers:
 *                  type: integer
 *                  description: Total correct answers.
 *                incorrectAnswers:
 *                  type: integer
 *                  description: Total incorrect answers.
 *                points:
 *                  type: integer
 *                  description: Total points won.
 *                advantages:
 *                  type: integer
 *                  description: Total advantages used.
 *       example:
 *         player:
 *           correctAnswers: 5
 *           incorrectAnswers: 5
 *           points: 0
 *           advantages: 2
 *     UpdateRoomGroup:
 *       properties:
 *         player1:
 *           type: object
 *           properties:
 *                correctAnswers:
 *                  type: integer
 *                  description: Total correct answers.
 *                incorrectAnswers:
 *                  type: integer
 *                  description: Total incorrect answers.
 *                points:
 *                  type: integer
 *                  description: Total points won.
 *                advantages:
 *                  type: integer
 *                  description: Total advantages used.
 *         player2:
 *           type: object
 *           properties:
 *                correctAnswers:
 *                  type: integer
 *                  description: Total correct answers.
 *                incorrectAnswers:
 *                  type: integer
 *                  description: Total incorrect answers.
 *                points:
 *                  type: integer
 *                  description: Total points won.
 *                advantages:
 *                  type: integer
 *                  description: Total advantages used.
 *       example:
 *         player1:
 *           correctAnswers: 5
 *           incorrectAnswers: 5
 *           points: 0
 *           advantages: 2
 *         player2:
 *           correctAnswers: 6
 *           incorrectAnswers: 4
 *           points: 20
 *           advantages: 2
 */

const Room_Match = db.define(
  "room_match",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id"
    },
    opponentUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "opponent_user_id"
    },
    dataRoom: {
      type: DataTypes.JSON,
      allowNull: true,
      field: "data_room"
    },
    status: {
      type: DataTypes.ENUM("waiting", "gaming", "refused", "finished"),
      defaultValue: "waiting"
    },
    typeGame: {
      type: DataTypes.ENUM("random", "friends", "solitary"),
      defaultValue: "random"
    }
  },
  { timestamps: false }
);

module.exports = Room_Match;
