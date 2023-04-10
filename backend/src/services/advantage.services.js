const { Advantage, User_Advantage, User } = require("../models");
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

      if (!advantageId) throw "The advantageId body property is missing";

      if (buy) {
        await User_Advantage.update(
          { quantity: sequelize.literal(`quantity + ${quantity}`) },
          { where: { userId: id, advantageId } }
        );

        return { message: "User's advantage updated successfully" };
      } else {
        const advantageToUpdate = await User_Advantage.findOne({
          where: { userId: id, advantageId }
        });
        if (advantageToUpdate.dataValues.quantity === 0)
          return { message: "The user advantage's quantity is already zero" };

        await User_Advantage.update(
          { quantity: sequelize.literal("quantity - 1") },
          { where: { userId: id, advantageId } }
        );

        return { message: "User's advantage updated successfully" };
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AdvantageServices;
