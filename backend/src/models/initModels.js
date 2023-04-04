const {
  User,
  User_Friend,
  Room_Match,
  Achievement,
  Advantage,
  News,
  Question,
  Topic,
  Topic_News,
  User_Achievement,
  User_Advantage,
  User_Topic
} = require("./index");

const initModels = () => {
  /* ------------------------ Relación entre usuarios amigos ------------------------ */

  User.hasMany(User_Friend, { as: "friends", foreignKey: "userId" });
  User_Friend.belongsTo(User, { as: "userFriend", foreignKey: "userId" });

  User.hasMany(User_Friend, { as: "added", foreignKey: "addedUserId" });
  User_Friend.belongsTo(User, { as: "userAdded", foreignKey: "addedUserId" });

  /* -------------------------    Relación entre usuarios    ------------------------- */

  User.hasMany(Room_Match, { as: "rooms", foreignKey: "user_id" });
  Room_Match.belongsTo(User, { as: "user", foreignKey: "user_id" });
  
  User.hasMany(Room_Match, { as: "roomsMatch", foreignKey: "opponent_user_id" });
  Room_Match.belongsTo(User, { as: "opponent", foreignKey: "opponent_user_id" });
  
  /* -------------------------  Relación User - Achievement  ------------------------- */

  User.belongsToMany(Achievement, { through: User_Achievement });
  Achievement.belongsToMany(User, { through: User_Achievement });

  /* -------------------------   Relación User - Advantage   ------------------------- */

  User.belongsToMany(Advantage, { through: User_Advantage });
  Advantage.belongsToMany(User, { through: User_Advantage });

  /* -------------------------     Relación User - Topic     ------------------------- */

  User.belongsToMany(Topic, { through: User_Topic });
  Topic.belongsToMany(User, { through: User_Topic });

  /* -------------------------   Relación Topic - Question   ------------------------- */

  Topic.hasMany(Question);
  Question.belongsTo(Topic);

  /* -------------------------     Relación Topic - News     ------------------------- */

  Topic.belongsToMany(News, { through: Topic_News });
  News.belongsToMany(Topic, { through: Topic_News });
};

module.exports = initModels;
