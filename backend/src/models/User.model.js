const db = require('../utils/database');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const codeGenerate = () => Math.floor(Math.random() * 900000) + 100000;

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The User ID.
 *         username:
 *           type: string
 *           description: The name of the User.
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the User.
 *         password:
 *           type: string
 *           description: The password of the User.
 *         lifes:
 *           type: integer
 *           description: The lifes of the User.
 *         points:
 *           type: integer
 *           description: The points of the User.
 *         coins:
 *           type: integer
 *           description: The coins of the User.
 *         advantages:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the advantage.
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the advantage.
 *         profileImg:
 *           type: string
 *           description: The picture of the User.
 *         online:
 *           type: boolean
 *           description: The online status of the User.
 *         status:
 *           type: string
 *           description: The status of game of the User.
 *       example:
 *         id: 1
 *         username: 'My_User_Name'
 *         email: 'example@email.com'
 *         password: '123456'
 *         lifes: 5
 *         points: 0
 *         coins: 0
 *         advantages:
 *           - name: '50 %'
 *             quatity: 5
 *           - name: 'More Time'
 *             quatity: 5
 *         profileImg: 'https://mypictureofmyprofile.png'
 *         online: true
 *         status: 'gaming'
 *     CreateUser:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The name of the User.
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the User.
 *         password:
 *           type: string
 *           description: The password of the User.
 *         profileImg:
 *           type: string
 *           description: The picture of the User.
 *       example:
 *         username: 'My_User_Name'
 *         email: 'example@email.com'
 *         password: '123456'
 *         profileImg: 'https://mypictureofmyprofile.png'
 *     UpdateUser:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The name of the User.
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the User.
 *         profileImg:
 *           type: string
 *           description: The picture of the User.
 *       example:
 *         username: 'My_User_Name'
 *         email: 'example@email.com'
 *         password: '123456'
 *         profileImg: 'https://mypictureofmyprofile.png'
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

const Users = db.define(
    'users',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lifes: {
            type: DataTypes.INTEGER,
            defaultValue: 10
        },
        points: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        coins: {
            type: DataTypes.INTEGER,
            defaultValue: 100
        },
        profileImg: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'profile_img'
        },
        online: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'Active'
        },
        codeVerify: {
            type: DataTypes.INTEGER,
            defaultValue: codeGenerate(),
            field: 'code_verify'
        },
        isVerify: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_verify'
        }
    },
    {
        hooks: {
            beforeCreate: (user, options) => {
                const { password } = user;
                const hash = bcrypt.hashSync(password, 8);
                user.password = hash;
            }
        }
    }
);

module.exports = Users;
