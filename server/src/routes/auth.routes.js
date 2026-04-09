const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Example protected route for verification
router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'Token is valid', user: req.user });
});

module.exports = router;
