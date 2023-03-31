const { RoomServices } = require("../services");

/* const create = async (req, res, next) => {
    try {
        const body = req.body;

        res.status(201).json(result);
    } catch (error) {
        next({
            status: 400,
            message: 'Error al crear room',
            errorContent: error
        })
    }
}; */

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

/* const getAll = async (req, res, next) => {
    try {

        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            message: 'Error al obtener rooms',
            errorContent: error
        })
    }
};

const update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;

        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            message: 'Error al actualizar room',
            errorContent: error
        })
    }
};

const delete = async (req, res, next) => {
    try {
        const id = req.params.id;

        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            message: 'Error al eliminar room',
            errorContent: error
        })
    }
}; */

module.exports = { getRoomById };
