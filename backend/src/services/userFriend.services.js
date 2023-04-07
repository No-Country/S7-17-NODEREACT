const { User_Friend, User } = require("../models");

class UserFriendServices {
  static async addUserFriend({ userId, addedUserId }) {
    try {
      const promises = [
        User_Friend.findOne({ where: { userId, addedUserId, status: "pending" } }),
        User_Friend.findOne({
          where: { userId: addedUserId, addedUserId: userId, status: "pending" }
        }),
        User_Friend.findOne({ where: { userId, addedUserId, status: "refuse" } }),
        User_Friend.findOne({ where: { userId, addedUserId, status: "accept" } }),
        User_Friend.findOne({
          where: { userId: addedUserId, addedUserId: userId, status: "accept" }
        })
      ];
      await Promise.all(promises);

      if (promises[0].id || promises[1].id) throw "Friend request pending";
      if (promises[2].id) throw "Friend request refused";
      if (promises[3].id || promises[4].id) throw "Already friends";

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
            attributes: ["id", "username", "email", "profileImg", "online", "status"],
            raw: true
          },
          raw: true
        }),
        User_Friend.findAll({
          where: { addedUserId: id, status },
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
