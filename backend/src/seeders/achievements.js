const axios = require("axios");
const { Achievement } = require("../models");

const getAchievements = async () => {
  try {
    const achievements = await axios.get("");
    await Achievement.bulkCreate(achievements.data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = getAchievements;
