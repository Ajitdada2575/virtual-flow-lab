const mysql = require("mysql2");
require("dotenv").config(); // ← THIS LINE IS IMPORTANT

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database error", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

module.exports = db;
