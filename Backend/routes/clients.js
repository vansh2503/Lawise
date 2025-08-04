const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');  // To use environment variables
dotenv.config();  // Load environment variables from .env file

const router = express.Router();

// Route for sending video call link
router.post('/sendVideoCallLink', async (req, res) => {
  const { clientEmail, clientName } = req.body;
  
  if (!req.body || !req.body.clientEmail || !req.body.clientName) {
    return res.status(400).json({ error: 'clientEmail and clientName are required' });
}
console.log('Request body:', req.body);
  

  // Generate a unique video call link (you can customize this logic)
  const meetingLink = `https://meet.google.com/wty-sbdo-mqh`;

  // Nodemailer setup and sending email logic
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // Use environment variable for email
      pass: process.env.EMAIL_PASS  // Use environment variable for app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,  // Use environment variable for email
    to: clientEmail,
    subject: 'Video Call Link',
    text: `Hello ${clientName},\n\nClick the link to join the video call: ${meetingLink}\n\nBest regards,\nYour Company`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);  // Log the error for debugging
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
