const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthServices {
  static async authenticate(credentials) {
    try {
      const { username, password, socketId } = credentials;
      const getUser = await User.findOne({
        where: { username }
      });
      await User.update({ socketId }, { where: { id: getUser.id } });
      console.log(credentials);
      if (!getUser) throw "User not found.";
      const isValid = bcrypt.compareSync(password, getUser.password);
      if (!isValid) throw "Incorrect password.";
      return { isValid, getUser };
    } catch (error) {
      throw error;
    }
  }
  static generateToken(data) {
    try {
      const token = jwt.sign(data, process.env.SECRET_KEY, {
        algorithm: "HS512"
      });
      return { token };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthServices;
