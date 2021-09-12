exports.signup = (req, res, next) => {
  // const errors = validationResult(req);
  const errors = null;
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
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
};
