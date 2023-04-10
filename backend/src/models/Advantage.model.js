const db = require("../utils/database");
const { DataTypes } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     Advantage:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the Advantage.
 *         name:
 *           type: string
 *           description: The name of the Advantage.
 *         description:
 *           type: string
 *           description: The description of the Advantage.
 *         iconImg:
 *           type: string
 *           description: The image's url of the Advantage.
 *         price:
 *           type: integer
 *           description: The price of the Advantage.
 *       example:
 *         id: 1
 *         name: 'Martillo'
 *         description: 'Elimina 2 opciones de las 4 posibles.'
 *         iconImg: 'https://mi.imagen.com/icono-martillo.jpg'
 *         price: 20
 */

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
