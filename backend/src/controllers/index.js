const {
  createUser,
  getUserById,
  getUsers,
  getTopRankedUsers,
  verifyUser,
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
  deleteFriend
} = require("./userFriend.controllers.js");
const {
  createRoomSolitary,
  getRoomById,
  getAllRoom,
  updateRoomSolitary,
  deleteRoom
} = require("./roomMatch.controllers.js");
const { getAchievements, getUserUnlockedAchievements } = require("./achievement.controllers.js");
const { getAdvantages, getUserAdvantages } = require("./advantage.controllers.js");

module.exports = {
  createUser,
  getUserById,
  getUsers,
  getTopRankedUsers,
  verifyUser,
  updateOffline,
  updateUser,
  updateUserPassword,
  deleteUser,
  userLogin,
  addUserFriend,
  getUserFriends,
  acceptFriend,
  deleteFriend,
  getRoomById,
  createRoomSolitary,
  getAllRoom,
  updateRoomSolitary,
  deleteRoom,
  getAchievements,
  getUserUnlockedAchievements,
  getAdvantages,
  getUserAdvantages
};
