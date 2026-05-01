const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ SAVE FEEDBACK (UPDATED FOR Q1–Q4)
router.post("/", (req, res) => {

  const { user_id, q1, q2, q3, q4 } = req.body;

  const query = `
    INSERT INTO feedback
    (user_id, q1, q2, q3, q4)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [user_id, q1, q2, q3, q4],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({ message: "Feedback saved ✅" });
    }
  );
});


// 📊 GET ALL FEEDBACK (ADMIN)
router.get("/", (req, res) => {

  const query = `
    SELECT 
      id,
      user_id,
      q1,
      q2,
      q3,
      q4,
      created_at
    FROM feedback
    ORDER BY id DESC
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });

});

module.exports = router;