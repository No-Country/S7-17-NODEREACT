const { Advantage, User_Advantage } = require("../models");
const sequelize = require("sequelize");

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
  static async updateUserAdvantages(id, body) {
    try {
      const { buy, advantageId, quantity } = body;

      if (buy) {
        User_Advantage.update(
          { quantity: sequelize.literal(`quantity + ${quantity}`) },
          { where: { userId: id, advantageId } }
        );
      } else {
        User_Advantage.update(
          { quantity: sequelize.literal("quantity - 1") },
          { where: { userId: id, advantageId } }
        );
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AdvantageServices;
