const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Advantage = db.define(
  "advantage",
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
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    iconImg: {
      type: DataTypes.STRING,
      defaultValue:
        "https://www.clipartmax.com/png/middle/186-1864281_jester-or-joker-cartoon-illustration-stock-photo-black-and-white-card-joker.png",
      field: "icon_img"
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

module.exports = Advantage;
