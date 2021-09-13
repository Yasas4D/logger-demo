// User data in a database
const users = [
  { firstName: "Jane", lastName: "Smith", age: 20 },
  //...
  { firstName: "John", lastName: "Smith", age: 30 },
  { firstName: "Mary", lastName: "Green", age: 50 },
];

exports.getUsers = async (req, res, next) => {
  let results = [...users];
  res.status(200).json({
    message: "Fetch Users Successfully",
    users: results,
  });
};
