const { User } = require("../models");
const { AuthServices } = require("../services");

const userLogin = async (req, res, next) => {
  try {
    const credentials = req.body;
    const { getUser } = await AuthServices.authenticate(credentials);
    const { email, password, id, username, profileImg } = getUser;
    const token = AuthServices.generateToken({ email, password, id });
    if (token) await User.update({ online: true }, { where: { id } });
    const user = {
      id,
      username,
      email,
      profileImg
    };
    res.status(200).json({ ...user, ...token });
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "Error login"
    });
  }
};

module.exports = { userLogin };
