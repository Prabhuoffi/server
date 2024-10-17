// routes/applicationRoutes.js

const express = require('express');
const router = express.Router();
const { applyJob, getApplications } = require('../controllers/applicationControllers');
const { protect, admin } = require('../middleware/authmiddleware');
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/resumes/');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
  fileFilter: function(req, file, cb) {
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Resumes must be PDF or DOC/DOCX'));
    }
  },
});

// Debugging logs
console.log('protect:', protect);
console.log('admin:', admin);
console.log('getApplications:', getApplications);

// Routes
router.post('/', upload.single('resume'), applyJob);
router.get('/', protect, admin, getApplications);

module.exports = router;
