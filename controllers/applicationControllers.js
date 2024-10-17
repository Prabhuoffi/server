// controllers/applicationControllers.js

const Application = require('../models/Applications');

// Apply for a Job
exports.applyJob = async (req, res) => {
  const { name, email, position } = req.body;
  const resume = req.file ? req.file.path.replace(/\\/g, '/') : null; // Normalize path for Windows

  if (!resume) {
    return res.status(400).json({ message: 'Resume is required' });
  }

  try {
    const application = await Application.create({
      name,
      email,
      position,
      resume,
    });
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Applications (Admin)
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
