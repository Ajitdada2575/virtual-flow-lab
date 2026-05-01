const db = require("../config/db");

// Register

exports.register = (req, res) => {
  const { name, email, mobile, college, password } = req.body;

  const sql = `
INSERT INTO users 
(name,email,mobile,college,password)
VALUES (?,?,?,?,?)
`;

  db.query(sql, [name, email, mobile, college, password], (err, result) => {
    if (err) {
      return res.json({ error: err });
    }

    res.json({
      message: "User Registered Successfully",
    });
  });
};
const { generateToken } = require("../utils/jwt");

exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = `
    SELECT * FROM users
    WHERE email = ? AND password = ?
  `;

  db.query(query, [email, password], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.json({
        success: false,
        message: "Invalid Credentials ❌",
      });
    }

    const user = result[0];

    const token = generateToken(user);

    res.json({
      success: true,
      message: "Login Successful ✅",
      token,
      user,
    });
  });
};
// Login

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = `
SELECT * FROM users
WHERE email=? AND password=?
`;

  db.query(sql, [email, password], (err, result) => {
    if (result.length === 0) {
      return res.json({
        message: "Invalid Credentials",
      });
    }

    res.json({
      message: "Login Success",
      user: result[0],
    });
  });
};
