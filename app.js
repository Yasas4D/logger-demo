const express = require("express");
const userRouts = require("./routes/users");
const authRouts = require("./routes/auth");
const app = express();
const logger = require("./utils/logger");
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// logger.error("Hello, Winston logger, the second error!");
// logger.info("Hello, Winston logger, some info!");

app.use("/auth", authRouts);
app.use("/api", userRouts);

// Root path
app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});

app.listen(port, () => {
  logger.warn("warnigggggg");
  logger.error(`Custom Error Message`);
  logger.info(`Server Started in port : ${port}!`);
  logger.debug(`debyug Server Started in port : ${port}!`);
});
