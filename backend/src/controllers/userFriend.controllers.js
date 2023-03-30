const { UserFriendServices } = require('../services');

const addUserFrined = async (req, res, next) => {
    try {
        const friend = req.body;
        const result = await UserFriendServices.addUserFrined(friend);
        res.status(201).json(result);
    } catch (error) {
        next({
            status: 400,
            message: 'Error al crear',
            errorContent: error
        });
    }
};

const getAllUserFrineds = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await UserFriendServices.getAllUserFrineds(id);
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            message: 'Error al obtener los usuarios',
            errorContent: error
        });
    }
};

const deleteUserFrined = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await UserFriendServices.deleteUserFrined(id);
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            message: 'Error al eliminar',
            errorContent: error
        });
    }
};

module.exports = {
    addUserFrined,
    getAllUserFrineds,
    deleteUserFrined
};
