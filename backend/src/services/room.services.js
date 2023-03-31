const { RoomMatch } = require("../models");

class RoomServices {
  static async create(body) {
    try {
    } catch (error) {
      throw error;
    }
  }
  static async getRoomById(id) {
    try {
      if (!id) throw "Id is not found";
      const result = await RoomMatch.findByPk(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getAll() {
    try {
    } catch (error) {
      throw error;
    }
  }
  static async update(id, body) {
    try {
    } catch (error) {
      throw error;
    }
  }
  static async delete(id) {
    try {
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RoomServices;
