const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Question = db.define(
  "question",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 3
      }
    },
    img: {
      type: DataTypes.STRING,
      defaultValue:
        "https://img.freepik.com/free-vector/flat-people-asking-questions-illustration_23-2148910627.jpg"
    },
    correctAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "correct_answer"
    },
    incorrectAnswers: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      field: "incorrect_answers"
    }
  },
  {
    timestamps: false
  }
);

module.exports = Question;
