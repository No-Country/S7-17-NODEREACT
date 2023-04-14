const { TopicServices } = require("../services");

const getTopics = async (req, res, next) => {
  try {
    const result = await TopicServices.getTopics();
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener tópicos",
      errorContent: error
    });
  }
};

const getUserTopics = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await TopicServices.getUserTopics(id);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener tópicos",
      errorContent: error
    });
  }
};

module.exports = { getTopics, getUserTopics };
