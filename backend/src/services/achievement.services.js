const { Achievement, User_Achievement } = require("../models");

class AuthServices {
  static async getAchievements() {
    try {
      const achievements = await Achievement.findAll();
      return achievements;
    } catch (error) {
      throw error;
    }
  }
  static async getUserUnlockedAchievements(id) {
    try {
      const userUnlockedAchievements = await User_Achievement.findAll({ where: { userId: id } });
      const achievementsArray = userUnlockedAchievements.map(achievement => achievement.dataValues);

      const unlockedAchievements = [];
      for (const achievement of achievementsArray) {
        const unlockedAchievement = await Achievement.findByPk(achievement.achievementId);
        unlockedAchievements.push(unlockedAchievement.dataValues);
      }

      return unlockedAchievements;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthServices;
