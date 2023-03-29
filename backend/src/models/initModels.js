const { Achievement, Advantage } = require("./index");

const initModels = () => {
  /* ----------------------- Relación Achievement - User ----------------------- */

  Achievement.belongsToMany(User, { through: "user_achievement" });
  User.belongsToMany(Achievement, { through: "user_achievement" });

  /* ----------------------- Relación Advantage   - User ----------------------- */

  Advantage.belongsToMany(User, { through: "user_advantage" });
  User.belongsToMany(Advantage, { through: "user_advantage" });
};

module.exports = initModels;
