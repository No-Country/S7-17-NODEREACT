const {
    createUser,
    getUser,
    getAllUser,
    updateOfline,
    updateUser,
    deleteUser
} = require('./user.controllers.js');
const { userLogin } = require('./auth.controller');
const {
    addUserFrined,
    getAllUserFrineds,
    deleteUserFrined
} = require('./userFriend.controllers.js');

module.exports = {
    createUser,
    getUser,
    getAllUser,
    updateUser,
    deleteUser,
    userLogin,
    addUserFrined,
    updateOfline,
    getAllUserFrineds,
    deleteUserFrined
};
