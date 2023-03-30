const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Topic_News = db.define(
  "topic_news",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    timestamps: false
  }
);

module.exports = Topic_News;
