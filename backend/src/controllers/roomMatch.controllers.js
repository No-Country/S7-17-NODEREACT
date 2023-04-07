const { RoomServices } = require("../services");

const createRoomSolitary = async (req, res, next) => {
  try {
    console.log('hi controller')
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

const getRoomById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await RoomServices.getRoomById(id);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener room",
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

const updateRoomSolitary = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedRoom = req.body;
    const result = await RoomServices.updateRoomSolitary(id, updatedRoom);
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
  getRoomById,
  getAllRoom,
  updateRoomSolitary,
  deleteRoom
};
