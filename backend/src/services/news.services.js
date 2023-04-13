const { News, Topic, User_Topic, User } = require("../models");
const { Op } = require("sequelize");

class NewsServices {
  static async getNewsByUserTopics(id) {
    try {
      if (!id) throw "Ids not found";
      if (isNaN(parseInt(id))) throw "Id param must be an integer";

      // const { topics } = await User.findByPk(id, {
      //   attributes: [],
      //   include: {
      //     model: Topic,
      //     as: "topics",
      //     attributes: ["id"],
      //     through: {
      //       attributes: []
      //     }
      //   }
      // });

      const topics = await User_Topic.findAll({ where: { userId: id }, attributes: ["topicId"] });
      const topicId = topics.map(topic => topic.dataValues.topicId);

      const news = await News.findAll({
        where: {
          topicId: {
            [Op.and]: [topicId]
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
