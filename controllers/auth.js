const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Enterd Data is incorrect");
    return res.status(422).json({
      message: error,
      errors: errors.array(),
    });
  }

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "User Created Successfully",
        userId: result._id,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        console.log("No user found");
        const error = new Error("NO Email is found");
        // return res.status(401).json({
        //   message: error,
        // });
        throw error;
      }
      loadedUser = user;
      console.log("Userrrrrrrrrrr" + user);

      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        console.log("=========password is Incorrect=============");

        const error = new Error("Password is Incorrect");
        return res.status(401).json({
          message: error,
        });
      }

      //now we shold give a json web token
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(), //can add any data
        },
        "SomeSuperSecreat", //some long string as the secreat code of the token
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
      });
    })
    .catch((err) => {
      console.log("Erooorrr=====last catch");

      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
