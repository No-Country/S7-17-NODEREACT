const {
  createUser,
  getUserById,
  getUsers,
  updateOffline,
  updateUser,
  deleteUser
} = require("./user.controllers.js");
const { userLogin } = require("./auth.controllers.js");
const { addUserFriend, getUserFriends, deleteUserFriend } = require("./userFriend.controllers.js");
const { getRoomById } = require("./roomMatch.controllers.js");

module.exports = {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  userLogin,
  addUserFriend,
  updateOffline,
  getUserFriends,
  deleteUserFriend,
  getRoomById
};
