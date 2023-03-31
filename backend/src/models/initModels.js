const { 
  Users,
  UsersFriends,
  RoomMatch,
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
  /* ------------ Relacion entre usuarios amigos ------------ */

  Users.hasMany(UsersFriends, { as: "firends", foreignKey: "user_id" });
  UsersFriends.belongsTo(Users, { as: "userFirend", foreignKey: "user_id" });

  Users.hasMany(UsersFriends, { as: "added", foreignKey: "added_user_id" });
  UsersFriends.belongsTo(Users, { as: "userAdded", foreignKey: "added_user_id" });

  /* ------------ Relacion entre usuarios  ------------ */

  Users.hasMany(RoomMatch, { as: "room", foreignKey: "first_participant_id" });
  RoomMatch.belongsTo(Users, { as: "users", foreignKey: "first_participant_id" });

  /* ----------------------- Relación User - Achievement ----------------------- */

  Users.belongsToMany(Achievement, { through: User_Achievement });
  Achievement.belongsToMany(Users, { through: User_Achievement });

  /* ----------------------- Relación User - Advantage   ----------------------- */

  Users.belongsToMany(Advantage, { through: User_Advantage });
  Advantage.belongsToMany(Users, { through: User_Advantage });

  /* ----------------------- Relación User - Topic       ----------------------- */

  Users.belongsToMany(Topic, { through: User_Topic });
  Topic.belongsToMany(Users, { through: User_Topic });

  /* ----------------------- Relación Topic - Question   ----------------------- */

  Topic.hasOne(Question);
  Question.belongsTo(Topic);

  /* ----------------------- Relación Topic - News       ----------------------- */

  Topic.belongsToMany(News, { through: Topic_News });
  News.belongsToMany(Topic, { through: Topic_News });
};

module.exports = initModels;
