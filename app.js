const express = require("express");
const userRouts = require("./routes/users");
const authRouts = require("./routes/auth");
const app = express();
const { appLogger } = require("./utils/logger");
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouts);
app.use("/api", userRouts);

// Root path
app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});

app.listen(port, () => {
  appLogger.info(`Server Started in port : ${port}!`);
});
