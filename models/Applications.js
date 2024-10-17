const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true },
  position:   { type: String, required: true },
  resume:     { type: String, required: true }, // Path to uploaded resume
  appliedAt:  { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', applicationSchema);
