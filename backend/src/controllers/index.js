const {
  createUser,
  getUserById,
  getUsers,
  getTopRankedUsers,
  updateOffline,
  updateUser,
  deleteUser
} = require("./user.controllers.js");
const { userLogin } = require("./auth.controllers.js");
const { addUserFriend, getUserFriends, deleteUserFriend } = require("./userFriend.controllers.js");
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
  getUserById,
  getUsers,
  getTopRankedUsers,
  updateUser,
  deleteUser,
  userLogin,
  addUserFriend,
  updateOffline,
  getUserFriends,
  deleteUserFriend,
  getRoomById,
  createRoomSolitary,
  createRoomFriend,
  createRoomRandom,
  getAllRoom,
  updateRoom,
  deleteRoom
};
