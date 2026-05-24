const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware (With expanded 50MB limits for high-res gallery uploads)
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database Connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("❌ ERROR: MONGO_URI environment variable is missing!");
} else {
    mongoose.connect(mongoURI)
        .then(() => console.log("🚀 Success: Connected to MongoDB Cloud Cluster!"))
        .catch(err => console.error("❌ Database connection error:", err.message));
}

// Data Schema for Ad Campaigns
const AdSchema = new mongoose.Schema({
    title: { type: String, required: true },
    targetLink: { type: String, required: true },
    imageUrl: { type: String, required: true },
    targetCountry: { type: String, required: true },
    status: { type: String, default: 'active' },
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

const Ad = mongoose.model('Ad', AdSchema);

// API ROUTES

// 1. Create a new campaign (POST)
app.post('/api/ads', async (req, res) => {
    try {
        const newAd = new Ad(req.body);
        await newAd.save();
        res.status(201).json({ success: true, data: newAd });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// 2. Fetch all campaigns (GET)
app.get('/api/ads', async (req, res) => {
    try {
        const ads = await Ad.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: ads });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


// FRONTEND ROUTE
// Serve the visual index.html dashboard when someone opens the main web URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the Server engine
app.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
});
