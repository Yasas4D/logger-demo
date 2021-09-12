const jwt = require("jsonwebtoken");
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  if (!req.get("Authorization")) {
    const error = new Error("Not Authenticated..");
    logger.error("Not Authenticated!");
    error.statusCode = 401;
    throw error;
  }

  const token = req.get("Authorization").split(" ")[1];
  let decodeToken;
  try {
    decodeToken = jwt.verify(token, "SomeSuperSecreat");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodeToken) {
    const error = new Error("Not Authenticated..");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodeToken.userId;
  next();
};
