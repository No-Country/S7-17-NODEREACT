const { UsersFriends, Users } = require("../models");

class UserFriendServices {
  static async addUserFrined(friend) {
    try {
      const result = await UsersFriends.create(friend);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getAllUserFrineds(id) {
    try {
      const [result1, result2] = await Promise.all([
        UsersFriends.findAll({
          where: { userId: id },
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
          where: { addedUserId: id },
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
