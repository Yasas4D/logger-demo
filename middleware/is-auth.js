const logger = require("../utils/logger");

module.exports = (req, res, next) => {
  if (!req.get("Authorization")) {
    const error = new Error("Not Authenticated..");
    logger.error("Not Authenticated!");
    error.statusCode = 401;
    throw error;
  }
  next();
};
