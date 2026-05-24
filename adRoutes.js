const express = require('express');
const router = express.Router();
const adController = require('./adController');

// This route allows your app or external widgets to request an ad
router.get('/fetch-ad', adController.getAdForUser);

module.exports = router;
