const { User_Friend, User } = require("../models");

class UserFriendServices {
  static async addUserFriend(friend) {
    try {
      const promises = [
        User_Friend.findOne({ where: { userId, addedUserId, status: "pending" } }),
        User_Friend.findOne({ where: { userId: addedUserId, addedUserId: userId, status: "pending" } }),
        User_Friend.findOne({ where: { userId, addedUserId, status: "refuce" } }),
        User_Friend.findOne({ where: { userId, addedUserId, status: "acepted" } }),
        User_Friend.findOne({ where: { userId: addedUserId, addedUserId: userId, status: "acepted" } })
      ];

      await Promise.all(promises);

      if (promises[0] || promises[1]) throw "Solicitud pendiente";
      if (promises[2]) throw "Solicitud rechazada";
      if (promises[3] || promises[4]) throw "¡Ya son amigos!";
      const result = await User_Friend.create({ userId, addedUserId });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getUserFriends(id) {
    try {
      const [result1, result2] = await Promise.all([
        User_Friend.findAll({
          where: { userId: id },
          attributes: {
            exclude: ["userId", "user_id", "addedUserId", "added_user_id", "updatedAt"]
          },
          include: {
            model: User,
            as: "userAdded",
            attributes: ["id", "username", "email", "profileImg", "online", "status"],
            raw: true
          },
          raw: true
        }),
        User_Friend.findAll({
          where: { addedUserId: id },
          attributes: {
            exclude: ["userId", "user_id", "addedUserId", "added_user_id", "updatedAt"]
          },
          include: {
            model: User,
            as: "userFriend",
            attributes: ["id", "username", "email", "profileImg", "online", "status"],
            raw: true
          },
          raw: true
        })
      ]);
      const friends = [...result1, ...result2];
      return friends;
    } catch (error) {
      throw error;
    }
  }
  static async deleteUserFriend(id) {
    try {
      await User_Friend.destroy({ where: { id } });
      return { message: "Deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserFriendServices;
