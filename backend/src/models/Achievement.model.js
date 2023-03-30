const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Achievement = db.define(
  "achievement",
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
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    iconImg: {
      type: DataTypes.STRING,
      defaultValue: "https://image.pngaaa.com/941/4173941-middle.png",
      field: "icon_img"
    }
  },
  {
    timestamps: false
  }
);

module.exports = Achievement;
