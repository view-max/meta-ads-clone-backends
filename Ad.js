const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  targetUrl: { type: String, required: true }, // The link people open when they click (like your WhatsApp link)
  targetCountries: [{ type: String }],       // Holds country codes like ['NG', 'US', 'GB']
  dailyBudget: { type: Number, required: true },
  totalSpend: { type: Number, default: 0 },
  impressions: { type: Number, default: 0 },  // Tracks how many times the ad was viewed
  clicks: { type: Number, default: 0 },       // Tracks how many times the ad was clicked
  status: { type: String, default: 'active' } // Can be active, paused, or out_of_budget
});

module.exports = mongoose.model('Ad', AdSchema);
