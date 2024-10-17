// config/db.js
require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB using the environment variable
const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed:", error);
        process.exit(1); // Optional: Exit process if DB connection fails
    }
};

module.exports = ConnectDB;
