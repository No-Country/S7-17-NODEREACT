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
  static async buyUserAdvantages(id, { advantageId, quantity }) {
    try {
      if (!advantageId) throw "The advantageId body property is missing";
      if (!quantity) throw "The quantity body property is missing";

      const result = await User_Advantage.update(
        { quantity: sequelize.literal(`quantity + ${quantity}`) },
        { where: { userId: id, advantageId } }
      );

      if (result[0] === 0) throw "User or Advantage not found";

      return { message: "User's advantage updated successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AdvantageServices;
