const { Advantage, User_Advantage } = require("../models");

class AdvantageServices {
  static async getAdvantages() {
    try {
      const advantages = await Advantage.findAll();
      return advantages;
    } catch (error) {
      throw error;
    }
  }
  static async getUserAdvantages(id) {
    try {
      const userAdvantages = await User_Advantage.findAll({
        where: { userId: id },
        attributes: {
          exclude: ["id", "userId"]
        }
      });
      const remainingAdvantages = userAdvantages.map(advantage => advantage.dataValues);
      return remainingAdvantages;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AdvantageServices;
