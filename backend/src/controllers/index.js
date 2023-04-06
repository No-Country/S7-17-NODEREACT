const {
  createUser,
  getUserById,
  getUsers,
  getTopRankedUsers,
  updateOffline,
  updateUser,
  updateUserPassword,
  deleteUser
} = require("./user.controllers.js");
const { userLogin } = require("./auth.controllers.js");
const {
  addUserFriend,
  getUserFriends,
  acceptFriend,
  deleteUserFriend
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
  getUserById,
  getUsers,
  getTopRankedUsers,
  updateUser,
  updateUserPassword,
  deleteUser,
  userLogin,
  addUserFriend,
  updateOffline,
  getUserFriends,
  acceptFriend,
  deleteUserFriend,
  getRoomById,
  createRoomSolitary,
  createRoomFriend,
  createRoomRandom,
  getAllRoom,
  updateRoom,
  deleteRoom
};
