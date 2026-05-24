const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const adRoutes = require('./adRoutes');

const app = express();

// Connect to your database configuration
connectDB();

// Middleware to handle data securely
app.use(cors());
app.use(express.json());

// Link all your ad and payment routes under the /api path
app.use('/api', adRoutes);

// A basic route to test if your app is alive online
app.get('/', (req, res) => {
  res.json({
    status: "success",
    message: "Meta Ads Clone Server Engine is live globally!"
  });
});

// Set up the port for the server to listen on
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running smoothly on port ${PORT}`);
});
