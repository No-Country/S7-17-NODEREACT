const {
  createUser,
  getUser,
  getAllUser,
  updateOfline,
  updateUser,
  deleteUser
} = require("./user.controllers.js");
const { userLogin } = require("./auth.controller");
const {
  addUserFrined,
  getAllUserFrineds,
  deleteUserFrined
} = require("./userFriend.controllers.js");

const {
  createRoomSolitary,
  createRoomFriend,
  createRoomRandom,
  getRoomById,
  getAllRoom,
  updateRoom,
  deleteRoom
} = require("./roomMatch.controllers.js");

module.exports = {
  createUser,
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
  userLogin,
  addUserFrined,
  updateOfline,
  getAllUserFrineds,
  deleteUserFrined,
  createRoomSolitary,
  createRoomFriend,
  createRoomRandom,
  getRoomById,
  getAllRoom,
  updateRoom,
  deleteRoom
};
