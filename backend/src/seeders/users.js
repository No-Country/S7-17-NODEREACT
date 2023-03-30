const axios = require("axios");
const { User } = require("../models");

const getUsers = async () => {
  try {
    // const users = await axios.get("https://apimocha.com/the-question/users");
    // await User.bulkCreate(users.data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = getUsers;
