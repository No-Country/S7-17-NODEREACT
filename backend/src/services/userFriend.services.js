const { UsersFriends, Users } = require("../models");

class UserFriendServices {
  static async addUserFrined({ userId, addedUserId }) {
    try {
      const promises = [
        UsersFriends.findOne({ where: { userId, addedUserId, status: "pending" } }),
        UsersFriends.findOne({ where: { userId: addedUserId, addedUserId: userId, status: "pending" } }),
        UsersFriends.findOne({ where: { userId, addedUserId, status: "refuce" } }),
        UsersFriends.findOne({ where: { userId, addedUserId, status: "acepted" } }),
        UsersFriends.findOne({ where: { userId: addedUserId, addedUserId: userId, status: "acepted" } })
      ];

      await Promise.all(promises);

      if (promises[0] || promises[1]) throw "Solicitud pendiente";
      if (promises[2]) throw "Solicitud rechazada";
      if (promises[3] || promises[4]) throw "¡Ya son amigos!";
      const result = await UsersFriends.create({ userId, addedUserId });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getAllUserFrineds(id) {
    try {
      const [result1, result2] = await Promise.all([
        UsersFriends.findAll({
          where: { userId: id, status: "acepted" },
          attributes: {
            exclude: ["userId", "user_id", "addedUserId", "added_user_id", "updatedAt"]
          },
          include: {
            model: Users,
            as: "userAdded",
            attributes: ["id", "username", "email", "profileImg", "online", "status"],
            raw: true
          },
          raw: true
        }),
        UsersFriends.findAll({
          where: { addedUserId: id, status: "acepted" },
          attributes: {
            exclude: ["userId", "user_id", "addedUserId", "added_user_id", "updatedAt"]
          },
          include: {
            model: Users,
            as: "userFirend",
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
  static async deleteUserFrined(id) {
    try {
      await UsersFriends.destroy({ where: { id } });
      return { message: "Deleted successful" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserFriendServices;
