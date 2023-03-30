const {
  Achievement,
  Advantage,
  Topic,
  User,
  User_Achievement,
  User_Advantage,
  User_Topic
} = require("./index");

const initModels = () => {
  /* ----------------------- Relación User - Achievement ----------------------- */

  User.belongsToMany(Achievement, { through: User_Achievement });
  Achievement.belongsToMany(User, { through: User_Achievement });

  /* ----------------------- Relación User - Advantage   ----------------------- */

  User.belongsToMany(Advantage, { through: User_Advantage });
  Advantage.belongsToMany(User, { through: User_Advantage });

  /* ----------------------- Relación User - Topic       ----------------------- */

  User.belongsToMany(Topic, { through: User_Topic });
  Topic.belongsToMany(User, { through: User_Topic });
};

module.exports = initModels;
