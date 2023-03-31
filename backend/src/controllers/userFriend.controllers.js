const { UserFriendServices } = require("../services");

const addUserFriend = async (req, res, next) => {
  try {
    const friend = req.body;
    const result = await UserFriendServices.addUserFriend(friend);
    res.status(201).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al añadir amigo",
      errorContent: error
    });
  }
};

const getUserFriends = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await UserFriendServices.getUserFriends(id);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener amigos",
      errorContent: error
    });
  }
};

const deleteUserFriend = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await UserFriendServices.deleteUserFriend(id);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al eliminar amigo",
      errorContent: error
    });
  }
};

module.exports = {
  addUserFriend,
  getUserFriends,
  deleteUserFriend
};
