// server.js
require('dotenv').config();
const express = require('express');
const ConnectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobsRoute');
const applicationRoutes = require('./routes/applicationRoutes');
const emailRouter = require('./email'); // Import the email router

const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
ConnectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);


app.get('/', (req, res) => {
    res.send("Start server");
});

app.use('/', emailRouter);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
