const { Room_Match } = require("../models");

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
      const result = await Room_Match.findByPk(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getRooms() {
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
