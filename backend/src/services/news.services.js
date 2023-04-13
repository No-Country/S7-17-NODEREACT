const { News, Topic, User_Topic, User } = require("../models");
const { Op } = require("sequelize");

class NewsServices {
  static async getNewsByUserTopics(id) {
    try {
      if (!id) throw "Id not found";
      if (isNaN(parseInt(id))) throw "Id param must be an integer";

      const { topics } = await User.findByPk(id, {
        attributes: [],
        include: {
          model: Topic,
          as: "topics",
          attributes: ["id"],
          through: {
            attributes: []
          }
        }
      });
      const topicIds = topics.map(topic => topic.id);

      const news = await News.findAll({
        where: {
          topicId: {
            [Op.and]: [topicIds]
          }
        },
        attributes: ["title", "summary", "img", "link"],
        include: { model: Topic, attributes: ["name"] }
      });
      return news;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = NewsServices;
