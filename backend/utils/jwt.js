const jwt = require("jsonwebtoken");

const SECRET = "virtual_lab_secret";

exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    SECRET,
    { expiresIn: "2h" }
  );
};

exports.verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};