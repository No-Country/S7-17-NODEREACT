const { User } = require("../models");

class UserServices {
  static async createUser(user) {
    try {
      const result = await User.create(user);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getUserById(id) {
    try {
      const result = await User.findByPk(id, {
        attributes: {
          exclude: ["password"]
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getUsers() {
    try {
      const result = await User.findAll();
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async updateOffline(id) {
    try {
      await User.update({ online: false }, { where: { id } });
      return { message: "Updated successfully" };
    } catch (error) {
      throw error;
    }
  }
  static async updateUser(id, body) {
    try {
      await User.update(body, { where: { id } });
      return { message: "User updated successfully" };
    } catch (error) {
      throw error;
    }
  }
  static async deleteUser(id) {
    try {
      await User.destroy({ where: { id } });
      return { message: "User deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserServices;
