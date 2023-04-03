const { RoomServices } = require("../services");

const createRoomSolitary = async (req, res, next) => {
  try {
    const room = req.body;
    const result = await RoomServices.createRoomSolitary(room);
    res.status(201).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al crear Room",
      errorContent: error
    });
  }
};

const createRoomFriend = async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);
    const result = await RoomServices.createRoomFriend(body);
    res.status(201).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al crear Room",
      errorContent: error
    });
  }
};

const createRoomRandom = async (req, res, next) => {
  try {
    const body = req.body;
    const result = await RoomServices.createRoomRandom(body);
    if (result) res.status(201).json(result);
    if (!result) res.status(404).json({ message: "Opponent not found" });
  } catch (error) {
    next({
      status: 400,
      message: "Error al crear Room",
      errorContent: error
    });
  }
};

const getRoomById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await RoomServices.getRoomById(id);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener los room",
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
      message: "Error al obtener los Rooms",
      errorContent: error
    });
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedRoom = req.body;
    const result = await RoomServices.updateRoom(id, updatedRoom);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al actualizar",
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
      message: "Error al eliminar",
      errorContent: error
    });
  }
};

module.exports = {
  createRoomSolitary,
  createRoomFriend,
  createRoomRandom,
  getRoomById,
  getAllRoom,
  updateRoom,
  deleteRoom
};
