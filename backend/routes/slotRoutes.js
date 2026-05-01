const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Generate slots for a day
router.post("/generate", (req, res) => {
  const date = req.body.date;

  let startHour = 9;
  let endHour = 17;

  let slots = [];

  for (let hour = startHour; hour < endHour; hour++) {
    slots.push([date, `${hour}:00:00`, `${hour}:30:00`]);
    slots.push([date, `${hour}:30:00`, `${hour + 1}:00:00`]);
  }

  const query = "INSERT INTO slots (slot_date, start_time, end_time) VALUES ?";

  db.query(query, [slots], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Slots Generated Successfully" });
  });
});

// Get Available Slots
router.get("/available", (req, res) => {
  const query = "SELECT * FROM slots WHERE is_booked = FALSE";

  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});

module.exports = router;
