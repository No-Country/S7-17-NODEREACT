const db = require('../utils/database');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const User = db.define('name', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
}, {
    hooks: {
        beforeCreate: (data, options) => {
            const { password } = data;
            const hash = bcrypt.hashSync(password, 8);
            data.password = hash;
        }
    }
}
);

module.exports = User;