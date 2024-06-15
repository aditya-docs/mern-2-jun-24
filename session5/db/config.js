const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to DB at", DB_URI);
  } catch (error) {
    console.log("Failed to connect to DB", e);
  }
};

module.exports = connectDB;
