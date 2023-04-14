const { Topic, User } = require("../models");

class TopicServices {
  static async getTopics() {
    try {
      const result = await Topic.findAll();
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getUserTopics(id) {
    try {
      if (isNaN(parseInt(id))) throw "Id param must be an integer";

      const result = await User.findByPk(id, {
        attributes: ["username"],
        include: { model: Topic, as: "topics", through: { attributes: [] } }
      });

      return result || { message: "There is no user with that id" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TopicServices;
