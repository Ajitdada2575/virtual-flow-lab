router.get("/approve/:id", (req, res) => {
  const id = req.params.id;

  const query = `
    SELECT b.id, u.email, u.name 
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    WHERE b.id = ?
  `;

  db.query(query, [id], (err, result) => {
    if (err || result.length === 0) return res.send("Error");

    const user = result[0];

    db.query(
      "UPDATE bookings SET status='approved' WHERE id=?",
      [id],
      (err2) => {
        if (err2) return res.send("Error");

        // ✅ Send mail to USER
        sendEmail(
          user.email,
          "Slot Approved ✅",
          `<h2>Your slot is approved</h2>
           <p>Hello ${user.name},</p>
           <p>Your lab slot has been approved.</p>`,
        );

        res.send("Slot Approved & Email Sent");
      },
    );
  });
});
