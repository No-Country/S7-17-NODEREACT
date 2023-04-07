const { RoomServices } = require("../services");

const createRoomSolitary = async (req, res, next) => {
  try {
    const room = req.body;

    const result = await RoomServices.createRoomSolitary(room);
    res.status(201).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al crear Room (solitary)",
      errorContent: error
    });
  }
};

<<<<<<< HEAD
=======
const createRoomFriend = async (req, res, next) => {
  try {
    const body = req.body;

    const result = await RoomServices.createRoomFriend(body);
    res.status(201).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al crear Room (friends)",
      errorContent: error
    });
  }
};

const createRoomRandom = async (req, res, next) => {
  try {
    const body = req.body;

    const result = await RoomServices.createRoomRandom(body);
    if (!result) return res.status(404).json({ message: "Opponent not found" });

    return res.status(201).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al crear Room (random)",
      errorContent: error
    });
  }
};

>>>>>>> origin/develop
const getRoomById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await RoomServices.getRoomById(id);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener Room",
      errorContent: error
    });
  }
};

const getAllRoom = async (req, res, next) => {
  try {
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener Rooms",
      errorContent: error
    });
  }
};

const updateRoomSolitary = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedRoom = req.body;

    const result = await RoomServices.updateRoomSolitary(id, updatedRoom);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al actualizar Room",
      errorContent: error
    });
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const id = req.params.id;

    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al eliminar Room",
      errorContent: error
    });
  }
};

module.exports = {
  createRoomSolitary,
  getRoomById,
  getAllRoom,
  updateRoomSolitary,
  deleteRoom
};
