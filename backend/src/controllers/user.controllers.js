const uploadPhoto = require('../middlewares/upPhoto.middleware');
const { UserServices } = require('../services');
const template = require('../template/template');
const transporter = require('../utils/mailer');

const createUser = async (req, res, next) => {
    try {
        const newUser = req.body;
        const img = req.files;
        if (img) {
            req.files.forEach((file, i) => {
                req.files[i].buffer = fs.readFileSync(file.path);
            });

            newUser.profileImg = await uploadPhoto(img);
        }

        const result = await UserServices.createUser(newUser);
        res.status(201).json(result);
        transporter.sendMail({
            from: '<corporationglya@gmail.com>',
            to: result.email,
            subject: 'Welcome to The Question',
            text: `¡Hello! ${result.userName} this is your verification code: ${result.codeVerify}`,
            html: template(result)
        });
    } catch (error) {
        next({
            status: 400,
            message: 'Error al crear',
            errorContent: error
        });
    }
};

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await UserServices.getUser(id);
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            message: 'Error al obtener los usuarios',
            errorContent: error
        });
    }
};

const getAllUser = async (req, res, next) => {
    try {
        const result = await UserServices.getAllUsers();
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            message: 'Error al obtener los usuarios',
            errorContent: error
        });
    }
};

const updateOfline = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await UserServices.updateOfline(id);
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            message: 'Error al obtener los usuarios',
            errorContent: error
        });
    }
};

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = req.body;
        const result = await UserServices.updateUser(id, user);
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            message: 'Error al actualizar',
            errorContent: error
        });
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await UserServices.deleteUser(id);
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            message: 'Error al eliminar',
            errorContent: error
        });
    }
};

module.exports = { createUser, getUser, getAllUser, updateOfline, updateUser, deleteUser };
