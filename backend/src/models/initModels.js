const { Users, UsersFriends, RoomMatch } = require("./index");

const initModels = () => {
  /* ------------ Relacion entre usuarios amigos ------------ */

  Users.hasMany(UsersFriends, { as: "firends", foreignKey: "user_id" });
  UsersFriends.belongsTo(Users, { as: "userFirend", foreignKey: "user_id" });

  Users.hasMany(UsersFriends, { as: "added", foreignKey: "added_user_id" });
  UsersFriends.belongsTo(Users, { as: "userAdded", foreignKey: "added_user_id" });

  /* ------------ Relacion entre usuarios  ------------ */

  Users.hasMany(RoomMatch, { as: "room", foreignKey: "first_participant_id" });
  RoomMatch.belongsTo(Users, { as: "users", foreignKey: "first_participant_id" });

  Users.hasMany(RoomMatch, { as: "roomMatch", foreignKey: "second_participant_id" });
  RoomMatch.belongsTo(Users, { as: "userMatch", foreignKey: "second_participant_id" });
};

module.exports = initModels;
