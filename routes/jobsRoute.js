const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/JobControllers');
const { protect, admin } = require('../middleware/authmiddleware');

router.route('/')
  .get(getJobs)
  .post(protect, admin, createJob);

router.route('/:id')
  .get(getJobById)
  .put(protect, admin, updateJob)
  .delete(protect, admin, deleteJob); // Make sure protect and admin middleware are working correctly

module.exports = router;
