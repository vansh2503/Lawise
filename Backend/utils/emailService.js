///utils/emailService.js
const nodemailer = require('nodemailer');

/*const transporter = nodemailer.createTransport({
    service: 'gmail', // Use the email service of your choice
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
*/


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
// Confirming environment variables
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Not Loaded"); // Don't print the actual password for security

const sendLoginNotification = (email) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Login Notification',
        text: 'You have successfully logged into your account.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending login email:', error);
        } else {
            console.log('Login notification sent:', info.response);
        }
    });
};

module.exports = { sendLoginNotification };
// Test sendLoginNotification directly
sendLoginNotification("sad314858@gmail.com");
