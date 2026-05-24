const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // We use an environment variable for security, falling back to a local database if missing
    const connString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/meta_ads_clone';
    
    await mongoose.connect(connString);
    console.log('Database Engine connected securely.');
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
