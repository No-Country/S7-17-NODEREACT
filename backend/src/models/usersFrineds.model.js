const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

/**
 * @openapi
 * components:
 *   schemas:
 *     UserFriend:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the User Friend relation.
 *         userId:
 *           type: integer
 *           description: The User ID of the User Friend relation.
 *         addedUserId:
 *           type: integer
 *           description: The User ID of the Friend added for relation.
 *       example:
 *         id: 1
 *         userId: 2
 *         addedUserId: 2
 *     AddUserFriend:
 *       type: object
 *       required:
 *         - userId
 *         - addedUserId
 *       properties:
 *         userId:
 *           type: integer
 *           description: The User ID of the User Friend relation.
 *         addedUserId:
 *           type: integer
 *           description: The User ID of the Friend added for relation.
 *       example:
 *         userId: 2
 *         addedUserId: 2
 */

const UsersFriends = db.define("users_friends", {
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
  addedUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "added_user_id"
  }
});

module.exports = UsersFriends;
