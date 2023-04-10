const { AdvantageServices } = require("../services");

const getAdvantages = async (req, res, next) => {
  try {
    const advantages = await AdvantageServices.getAdvantages();
    res.status(200).json(advantages);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener ventajas",
      errorContent: error
    });
  }
};

const getUserAdvantages = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userAdvantages = await AdvantageServices.getUserAdvantages(id);
    res.status(200).json(userAdvantages);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener ventajas de usuario",
      errorContent: error
    });
  }
};

module.exports = { getAdvantages, getUserAdvantages };
