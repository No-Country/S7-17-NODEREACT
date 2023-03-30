const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const News = db.define(
  "news",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: "https://legal-express.ru/main/img/news-default.png"
    }
  },
  {
    timestamps: false
  }
);

module.exports = News;
