const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (bearerToken) {
    const token = bearerToken.split("Bearer ")[1];
    try {
      jwt.verify(token, process.env.SECRET_KEY, "HS512");
      next();
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: "Invalid Token"
      });
    }
  } else {
    next({
      status: 400,
      errorContent: "No token provided",
      message: "No token provided"
    });
  }
};

const authenticateRoom = token => {
  if (!token) return token;
  return jwt.verify(token, process.env.SECRET_KEY, "HS512");
};

module.exports = {
  authenticate,
  authenticateRoom
};
