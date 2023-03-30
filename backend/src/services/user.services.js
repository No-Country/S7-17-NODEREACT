const { Users, UsersFriends } = require('../models');

class UserServices {
    static async createUser(user) {
        try {
            const result = await Users.create(user);
            return result;
        } catch (error) {
            throw error;
        }
    }
    static async getUser(id) {
        try {
            const result = await Users.findByPk(id, {
                attributes: {
                    exclude: ['password']
                }
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
    static async getAllUsers() {
        try {
            const result = await Users.findAll();
            return result;
        } catch (error) {
            throw error;
        }
    }
    static async updateOfline(id) {
        try {
            await Users.update({ online: false }, { where: { id } });
            return { message: 'Update successfull' };
        } catch (error) {
            throw error;
        }
    }
    static async updateUser(id, body) {
        try {
            await Users.update(body, { where: { id } });
            return { message: 'User update successful' };
        } catch (error) {
            throw error;
        }
    }
    static async deleteUser(id) {
        try {
            await Users.destroy({ where: { id } });
            return { message: 'User delete successful' };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserServices;
