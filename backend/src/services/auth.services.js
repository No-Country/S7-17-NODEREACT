const { Users } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthServices {
    static async authenticate(credentials) {
        try {
            const { username, password } = credentials;
            const getUser = await Users.findOne({
                where: { username }
            });
            if (!getUser) throw 'User not found.';
            const isValid = bcrypt.compareSync(password, getUser.password);
            if (!isValid) throw 'Incorrect password.';
            return { isValid, getUser };
        } catch (error) {
            throw error;
        }
    }
    static genToken(data) {
        try {
            const token = jwt.sign(data, process.env.SECRET_KEY, {
                algorithm: 'HS512'
            });
            return { token };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthServices;
