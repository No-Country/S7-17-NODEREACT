const { News } = require("../models");

class NewsServices {
  static async getNewsByTopic(id) {
    try {
      if (!id) throw "Id not found";
      if (isNaN(parseInt(id))) throw "Id param must be an integer";

      const news = await News.findAll({
        where: { topicId: id },
        attributes: ["title", "summary", "img", "link"]
      });
      return news;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = NewsServices;
