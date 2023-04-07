const { User_Friend, User } = require("../models");

class UserFriendServices {
  static async addUserFriend({ userId, addedUserId }) {
    try {
      const promises = [
        User_Friend.findOne({ where: { userId, addedUserId, status: "pending" } }),
        User_Friend.findOne({ where: { userId: addedUserId, addedUserId: userId, status: "pending" } }),
        User_Friend.findOne({ where: { userId, addedUserId, status: "refuse" } }),
        User_Friend.findOne({ where: { userId, addedUserId, status: "accept" } }),
        User_Friend.findOne({ where: { userId: addedUserId, addedUserId: userId, status: "accept" } })
      ];

      const promisesAll = await Promise.all(promises);

      if (promisesAll[0].id || promisesAll[1].id) throw "Solicitud pendiente";
      if (promisesAll[2].id) throw "Solicitud rechazada";
      if (promisesAll[3].id || promisesAll[4].id) throw "¡Ya son amigos!";

      const result = await User_Friend.create({ userId, addedUserId });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getUserFriends(id, status) {
    try {
      const [result1, result2] = await Promise.all([
        User_Friend.findAll({
          where: { userId: id, status },
          attributes: {
            exclude: ["userId", "user_id", "addedUserId", "added_user_id", "updatedAt"]
          },
          include: {
            model: User,
            as: "userAdded",
            attributes: ["id", "username", "email", "profileImg", "online", "status"]
          }
        }),
        User_Friend.findAll({
          where: { addedUserId: id, status },
          attributes: {
            exclude: ["userId", "user_id", "addedUserId", "added_user_id", "updatedAt"]
          },
          include: {
            model: User,
            as: "userFriend",
            attributes: ["id", "username", "email", "profileImg", "online", "status"]
          }
        })
      ]);

      const result = [...result1, ...result2];
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async acceptFriend(id, status) {
    try {
      await User_Friend.update(status, { where: { id } });

      return { message: "Friend accepted successfully" };
    } catch (error) {
      throw error;
    }
  }
  static async deleteFriend(id) {
    try {
      await User_Friend.destroy({ where: { id } });

      return { message: "Friend deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserFriendServices;
