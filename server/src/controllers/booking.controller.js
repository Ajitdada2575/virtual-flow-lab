const { Booking, User } = require('../models');
const { sendEmail } = require('../services/email.service');

// Admin email configured by user
const ADMIN_EMAIL = 'ghargeajitdada@gmail.com'; 

exports.createBooking = async (req, res) => {
  try {
    const { date, start_time, end_time } = req.body;
    const userId = req.user.userId;

    // 1. Time Validation: Check if the slot is in the future
    const bookingDateTime = new Date(`${date}T${start_time}`);
    const now = new Date();
    
    if (bookingDateTime < now) {
      return res.status(400).json({ message: 'You cannot book a time slot in the past. Please select a future date and time.' });
    }

    // 2. Create the booking as 'pending'
    const booking = await Booking.create({
      userId,
      date,
      start_time,
      end_time,
      status: 'pending' // explicit default
    });

    const user = await User.findByPk(userId);

    // 3. Send approval request to Admin
    if (user) {
      const serverUrl = process.env.SERVER_URL || 'http://localhost:5000';
      const approveUrl = `${serverUrl}/api/booking/action?id=${booking.id}&action=approve`;
      const declineUrl = `${serverUrl}/api/booking/action?id=${booking.id}&action=decline`;

      const adminSubject = `New Lab Booking Request: ${user.name}`;
      const adminHtml = `
        <h2>New Lab Slot Request</h2>
        <p><b>Student:</b> ${user.name} (${user.email})</p>
        <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <p><b>Date:</b> ${date}</p>
          <p><b>Time:</b> ${start_time} - ${end_time}</p>
        </div>
        <p>Please approve or decline this request:</p>
        <a href="${approveUrl}" style="background-color: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-right: 10px;">Approve Request</a>
        <a href="${declineUrl}" style="background-color: #ef4444; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Decline Request</a>
      `;
      // Send to Admin
      sendEmail(ADMIN_EMAIL, adminSubject, adminHtml);
      
      // Send informational email to User (optional but good UI)
      const userHtml = `
        <h2>Hi ${user.name},</h2>
        <p>We have received your booking request for <b>${date} at ${start_time}</b>.</p>
        <p>It is currently pending admin approval. You will receive an email once it is reviewed.</p>
      `;
      sendEmail(user.email, 'Lab Booking Request Received (Pending Approval)', userHtml);
    }

    res.status(201).json({ message: 'Booking requested successfully. Awaiting admin approval.', booking });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'This time slot is already booked.' });
    }
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.handleBookingAction = async (req, res) => {
  try {
    const { id, action } = req.query;

    if (!id || !['approve', 'decline'].includes(action)) {
      return res.status(400).send('Invalid action or booking ID.');
    }

    const booking = await Booking.findByPk(id, { include: User });
    if (!booking) return res.status(404).send('Booking not found.');

    if (booking.status !== 'pending') {
      return res.send(`This booking was already processed (Current status: ${booking.status})`);
    }

    // Update status
    booking.status = action === 'approve' ? 'approved' : 'declined';
    await booking.save();

    // Notify User
    const user = booking.User;
    if (user) {
      const subject = action === 'approve' 
        ? '✅ Lab Booking Approved!' 
        : '❌ Lab Booking Declined';
        
      const html = action === 'approve'
        ? `
          <h2>Hi ${user.name},</h2>
          <p>Great news! Your hardware lab session has been <b>approved</b> by the admin.</p>
          <div style="background-color: #d1fae5; padding: 15px; border-radius: 8px;">
            <p><b>Date:</b> ${booking.date}</p>
            <p><b>Time:</b> ${booking.start_time} - ${booking.end_time}</p>
          </div>
          <p>Please log in 5 minutes early to prepare for your session.</p>
        `
        : `
          <h2>Hi ${user.name},</h2>
          <p>Unfortunately, your hardware lab session on <b>${booking.date} at ${booking.start_time}</b> has been <b>declined</b>.</p>
          <p>This may be due to maintenance or schedule conflicts. Please try booking a different slot.</p>
        `;
      
      sendEmail(user.email, subject, html);
    }

    // Send HTTP Response back to Admin in the browser
    const color = action === 'approve' ? '#10b981' : '#ef4444';
    res.send(`
      <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
        <h1 style="color: ${color};">Booking successfully ${action}d!</h1>
        <p>The student (${user?.email}) has been notified via email.</p>
      </div>
    `);
    
  } catch (error) {
    console.error('Admin booking action error:', error);
    res.status(500).send('Server Error');
  }
};
