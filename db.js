const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connString = process.env.MONGO_URI;
    
    if (!connString) {
      console.log('⚠️ Running in offline preview mode (No MONGO_URI provided).');
      return;
    }
    
    await mongoose.connect(connString);
    console.log('Database Engine connected securely.');
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    // Safe bypass so the server doesn't crash during preview deployment
  }
};

module.exports = connectDB;
