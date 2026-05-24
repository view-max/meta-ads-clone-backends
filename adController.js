const Ad = require('./ad');

// The engine function that finds the right ad for a visitor
exports.getAdForUser = async (req, res) => {
  try {
    // 1. Get the user's country code (default to 'NG' if not detected yet)
    const userCountry = req.headers['user-country'] || 'NG';

    // 2. Look in the database for an ad matching that country
    const randomAd = await Ad.findOne({
      status: 'active',
      targetCountries: userCountry
    });

    if (!randomAd) {
      return res.status(404).json({ message: "No active ads available for your country right now." });
    }

    // 3. Automatically add 1 to the view count (Impression)
    randomAd.impressions += 1;
    await randomAd.save();

    // 4. Send the ad data back to the user's screen
    res.json(randomAd);

  } catch (error) {
    res.status(500).json({ error: "Internal server engine error" });
  }
};
