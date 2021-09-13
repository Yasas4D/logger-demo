exports.signup = (req, res, next) => {
  const { email, password } = req.body;
  //Here Handle the signup part
  console.log("User login.. email");
  return res.status(200).json({ message: "User Successfully Registered!" });
};
