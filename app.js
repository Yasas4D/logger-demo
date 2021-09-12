const express = require("express");
const feedRouts = require("./routes/feed");
const authRouts = require("./routes/auth");
const app = express();
const logger = require("./utils/logger");

logger.error("Hello, Winston logger, the second error!");
logger.info("Hello, Winston logger, some info!");

app.use("/feed", feedRouts);
app.use("/auth", authRouts);

// app.use((error, req, res, next) => {
//   console.log(error);
//   const status = error.statusCode || 500;
//   const message = error.message;
//   res.status(status).json({ message: message });
// });

app.listen(8080);
