// email.js

const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Setup Nodemailer transporter (use your email service credentials)
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email service provider
    auth: {
      user: process.env.EMAIL_USER, // Update this line
      pass: process.env.EMAIL_PASS, // Update this line
    },
  });
  

// Route to handle sending interview details
router.post('/api/send-profile', async (req, res) => {
  const { to, interviewDetails } = req.body; // Expect HR email and interview details in the request

  if (!to || !interviewDetails) {
    return res.status(400).json({ error: 'Missing HR email or interview details' });
  }

  // Create the email options
  const mailOptions = {
    from: process.env.EMAIL, // Sender email (your service email)
    to: to, // HR email
    subject: 'Interview Details for Candidate',
    text: interviewDetails, // Email body containing interview information
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
});

module.exports = router;
