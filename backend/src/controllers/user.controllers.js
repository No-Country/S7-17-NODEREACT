const { UserServices } = require("../services");
const uploadPhoto = require("../middlewares/uploadPhoto.middleware");
const template = require("../template/template");
const transporter = require("../utils/mailer");
const fs = require("fs");

const createUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    const img = req.files[0];
    let newImgs = "";
    if (img) {
      console.log(img);
      const newImg = await uploadPhoto(img);
      newUser.profileImg = newImg;
    }
    const result = await UserServices.createUser(newUser);
    res.status(201).json(result);
    /* transporter.sendMail({
            from: '<corporationglya@gmail.com>',
            to: result.email,
            subject: 'Welcome to The Question',
            text: `¡Hello! ${result.userName} this is your verification code: ${result.codeVerify}`,
            html: template(result)
        }); */
  } catch (error) {
    next({
      status: 400,
      message: "Error al crear usuario",
      errorContent: error
    });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await UserServices.getUserById(id);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener usuario",
      errorContent: error
    });
  }
};

const getUsers = async (req, res, next) => {
  try {
    const result = await UserServices.getUsers();
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener usuarios",
      errorContent: error
    });
  }
};

const getTopRankedUsers = async (req, res, next) => {
  try {
    const result = await UserServices.getTopRankedUsers();
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener usuarios mejor clasificados",
      errorContent: error
    });
  }
};

const updateOffline = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await UserServices.updateOffline(id);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al actualizar prop online del usuario",
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
      message: "Error al actualizar usuario",
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
      message: "Error al eliminar usuario",
      errorContent: error
    });
  }
};

module.exports = {
  createUser,
  getUserById,
  getUsers,
  getTopRankedUsers,
  updateOffline,
  updateUser,
  deleteUser
};
