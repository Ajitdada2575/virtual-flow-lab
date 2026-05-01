const express = require("express");
const router = express.Router();
const db = require("../config/db");
const sendEmail = require("../utils/emailService");

// ✅ FORMAT DATETIME (IMPORTANT)
const formatDateTime = (dt) => {
  if (dt.includes("T")) {
    return dt.replace("T", " ") + ":00";
  }
  return dt; // already formatted
};

// 🔥 REQUEST BOOKING API (WITH SLOT LOCKING)
router.post("/request", (req, res) => {
  const { user_id, slot_id, email, name, start_time, end_time } = req.body;

  const formattedStart = formatDateTime(start_time);
  const formattedEnd = formatDateTime(end_time);

  // 🔒 CHECK SLOT CONFLICT (FIXED LOGIC)
  const checkQuery = `
    SELECT * FROM bookings
    WHERE slot_id = ?
    AND status = 'approved'
    AND NOT (
      end_time <= ? OR start_time >= ?
    )
  `;

  db.query(
    checkQuery,
    [slot_id, formattedStart, formattedEnd],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      // ❌ Already booked
      if (result.length > 0) {
        return res.json({ message: "Slot already booked ❌" });
      }

      // ✅ Insert booking
      const insertQuery = `
        INSERT INTO bookings
        (user_id, slot_id, email, name, start_time, end_time, status)
        VALUES (?, ?, ?, ?, ?, ?, 'pending')
      `;

      db.query(
        insertQuery,
        [user_id, slot_id, email, name, formattedStart, formattedEnd],
        (err2, result2) => {
          if (err2) {
            console.log(err2);
            return res.status(500).json(err2);
          }

          const bookingId = result2.insertId;

          const approveLink = `http://localhost:5000/api/bookings/approve/${bookingId}`;
          const rejectLink = `http://localhost:5000/api/bookings/reject/${bookingId}`;

          const html = `
            <h2>New Slot Request</h2>
            <p><b>User:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Time:</b> ${formattedStart} to ${formattedEnd}</p>

            <br/>

            <a href="${approveLink}">
              <button style="padding:10px;background:green;color:white;border:none;">
                Approve
              </button>
            </a>

            <a href="${rejectLink}">
              <button style="padding:10px;background:red;color:white;border:none;">
                Reject
              </button>
            </a>
          `;

          sendEmail(
            "ghargeajitdada@gmail.com",
            "New Slot Booking Request",
            html,
          );

          res.json({ message: "Request sent to admin ✅" });
        },
      );
    },
  );
});

// ✅ APPROVE BOOKING (FINAL FIXED)
router.get("/approve/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT slot_id, start_time, end_time, email, name FROM bookings WHERE id=?",
    [id],
    (err, result) => {
      if (err) return res.send("Database Error");
      if (result.length === 0) return res.send("Booking not found");

      const { slot_id, start_time, end_time, email, name } = result[0];

      // 🔒 FINAL CONFLICT CHECK (FIXED)
      const checkQuery = `
        SELECT * FROM bookings
        WHERE slot_id = ?
        AND status = 'approved'
        AND id != ?
        AND NOT (
          end_time <= ? OR start_time >= ?
        )
      `;

      db.query(
        checkQuery,
        [slot_id, id, start_time, end_time],
        (err2, conflict) => {
          if (err2) return res.send("Check Error");

          if (conflict.length > 0) {
            return res.send("Slot already taken ❌");
          }

          // ✅ Approve
          db.query(
            "UPDATE bookings SET status='approved' WHERE id=?",
            [id],
            (err3) => {
              if (err3) return res.send("Update Error");

              sendEmail(
                email,
                "Slot Approved",
                `<h2>Hello ${name}</h2>
                 <p>Your lab slot has been approved ✅</p>
                 <p>Time: ${start_time} to ${end_time}</p>`,
              );

              res.send("Slot Approved & Email Sent ✅");
            },
          );
        },
      );
    },
  );
});

// ❌ REJECT BOOKING
router.get("/reject/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT email, name FROM bookings WHERE id=?",
    [id],
    (err, result) => {
      if (err) return res.send("Database Error");
      if (result.length === 0) return res.send("Booking not found");

      const { email, name } = result[0];

      db.query(
        "UPDATE bookings SET status='rejected' WHERE id=?",
        [id],
        (err2) => {
          if (err2) return res.send("Update Error");

          sendEmail(
            email,
            "Slot Rejected",
            `<h2>Hello ${name}</h2>
             <p>Your slot request was rejected ❌</p>`,
          );

          res.send("Slot Rejected & Email Sent");
        },
      );
    },
  );
});

// 🔥 GET ALL BOOKINGS
router.get("/", (req, res) => {
  db.query("SELECT * FROM bookings ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});
// 🔐 GET USER BOOKINGS (FIXED FOR DASHBOARD LIVE DATA)
router.get("/my-bookings", (req, res) => {

const user_id = req.headers["user_id"];

if (!user_id) {
return res.status(400).json({
message: "User ID required"
});
}

const query = `
SELECT
id,
slot_id,
user_id,
email,
name,
status,

CONCAT(
DATE(created_at),
' ',
TIME_FORMAT(start_time,'%H:%i:%s')
) AS start_time,

CONCAT(
DATE(created_at),
' ',
TIME_FORMAT(end_time,'%H:%i:%s')
) AS end_time

FROM bookings
WHERE user_id = ?
ORDER BY
STR_TO_DATE(
CONCAT(
DATE(created_at),
' ',
TIME_FORMAT(start_time,'%H:%i:%s')
),
'%Y-%m-%d %H:%i:%s'
) ASC
`;

db.query(
query,
[user_id],
(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({
message:"Database Error"
});
}

res.json({
bookings: result
});

}
);

});
module.exports = router;
