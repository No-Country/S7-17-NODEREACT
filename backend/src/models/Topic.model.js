const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Topic = db.define(
  "topic",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    timestamps: false
  }
);

module.exports = Topic;
