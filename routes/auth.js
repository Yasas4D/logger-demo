const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authController = require("../controllers/auth");

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Enater A valid Email")
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
