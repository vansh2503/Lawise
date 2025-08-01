// routes/auth.js
const express = require('express');
const { signup, login,fetch_from_user } = require('../controller/authcontroller');
const authMiddleware = require('../controller/authmiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
//router.get('/fetch_from_user',fetch_from_user);
router.post('/fetch_user_info', fetch_from_user);


router.post('/test-email', async (req, res) => {
  console.log("Reached test email route");
  try {
      sendLoginNotification(req.body.email);
      res.status(200).json({ message: "Test email sent successfully" });
  } catch (error) {
      console.error("Error sending test email:", error.message); // Log error message
      res.status(500).json({ message: "Failed to send test email", error: error.message }); // Include error in response
  }
});

// Protected route example
router.get('/profile', authMiddleware, (req, res) => {
    res.status(200).json({ message: "This is your profile.", user: req.user });
});

module.exports = router;
