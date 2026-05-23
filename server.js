const express = require('express');
const cors = require('cors');

const app = express();

// Middleware to handle incoming data securely
app.use(cors());
app.use(express.json());

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
  console.log(`Server is running on port ${PORT}`);
});
