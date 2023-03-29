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
      allowNull: false,
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
