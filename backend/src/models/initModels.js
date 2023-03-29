const { User, Achievement, Advantage, User_Achievement, User_Advantage } = require("./index");

const initModels = () => {
  /* ----------------------- Relación User - Achievement ----------------------- */

  User.belongsToMany(Achievement, { through: User_Achievement });
  Achievement.belongsToMany(User, { through: User_Achievement });

  /* ----------------------- Relación User - Advantage   ----------------------- */

  User.belongsToMany(Advantage, { through: User_Advantage });
  Advantage.belongsToMany(User, { through: User_Advantage });
};

module.exports = initModels;
