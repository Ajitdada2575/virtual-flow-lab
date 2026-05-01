const express = require('express');
const { createBooking, handleBookingAction } = require('../controllers/booking.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Admin action route (No auth middleware here so admin can just click link from email)
router.get('/action', handleBookingAction);

// User protected routes
router.post('/', authMiddleware, createBooking);

module.exports = router;
