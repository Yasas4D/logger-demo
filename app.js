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

app.listen(port, () => {
  console.log("Server started");
});
