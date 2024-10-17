const Job = require('../models/Jobs');

// Get All Jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job)
      return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create Job
exports.createJob = async (req, res) => {
  const { title, description, location, experience } = req.body;

  try {
    const job = await Job.create({ title, description, location, experience });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  const { title, description, location, experience } = req.body;

  try {
    const job = await Job.findById(req.params.id);
    if (!job)
      return res.status(404).json({ message: 'Job not found' });

    job.title = title || job.title;
    job.description = description || job.description;
    job.location = location || job.location;
    job.experience = experience || job.experience;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

//delete
exports.deleteJob = async (req, res) => {
  try {
    // Use findByIdAndDelete to directly delete the job
    const job = await Job.findByIdAndDelete(req.params.id);
    
    // If job is not found, it will return null
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job removed' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
