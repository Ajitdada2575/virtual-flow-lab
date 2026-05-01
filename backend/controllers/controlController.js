const db = require("../config/db");

// ✅ GET CURRENT TIME
const getCurrentTime = () => {
  return new Date().toTimeString().slice(0, 8);
};


// 🔐 CHECK ACCESS
exports.checkAccess = (req, res) => {

  console.log("🔥 CHECK ACCESS CALLED");

  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({
      access: false,
      message: "User ID required",
    });
  }

  const currentTime = getCurrentTime();

  const query = `
    SELECT * FROM bookings
    WHERE user_id = ?
    AND status = 'approved'
    AND ? BETWEEN start_time AND end_time
  `;

  db.query(query, [user_id, currentTime], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ access: false });
    }

    if (result.length > 0) {

      const booking = result[0];

      console.log("✅ Access Granted For:", booking.user_id);

      // ✅ INSERT SESSION LOG (FIXED TIME)
      const logQuery = `
        INSERT INTO session_logs
        (user_id, name, email, slot_id, login_time, logout_time, status)
        VALUES (?, ?, ?, ?, CURTIME(), NULL, 'active')
      `;

      db.query(logQuery, [
        booking.user_id,
        booking.name,
        booking.email,
        booking.slot_id
      ]);

      return res.json({
        access: true,
        message: "Access Granted ✅",
        booking: booking,
      });
    }

    return res.json({
      access: false,
      message: "Access Denied ❌",
    });

  });
};


// 👥 ACTIVE USERS
exports.getActiveUsers = (req, res) => {

  const currentTime = getCurrentTime();

  const query = `
    SELECT user_id, name, email, slot_id, start_time, end_time
    FROM bookings
    WHERE status = 'approved'
    AND ? BETWEEN start_time AND end_time
    ORDER BY start_time ASC
  `;

  db.query(query, [currentTime], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
};


// 🔴 FORCE LOGOUT
exports.forceLogout = (req, res) => {

  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({
      message: "User ID required",
    });
  }

  const query = `
    UPDATE bookings
    SET status = 'terminated'
    WHERE user_id = ?
    AND status = 'approved'
  `;

  db.query(query, [user_id], (err) => {

    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    // ✅ UPDATE SESSION LOG (FIXED TIME)
    const logQuery = `
      UPDATE session_logs
      SET logout_time = CURTIME(),
          status = 'terminated'
      WHERE user_id = ?
      AND logout_time IS NULL
    `;

    db.query(logQuery, [user_id], (err) => {
      if (err) {
        console.log("❌ Session Log Update Error:", err);
      } else {
        console.log("✅ Session Log Updated");
      }
    });

    res.json({
      message: "User Logged Out Successfully 🔴",
    });

  });
};


// 📜 SESSION LOGS
exports.getSessionLogs = (req, res) => {

  const query = `
    SELECT *
    FROM session_logs
    ORDER BY login_time DESC
  `;

  db.query(query, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
};