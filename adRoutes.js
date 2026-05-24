const express = require('express');
const router = express.Router();
const adController = require('./adController');
const paymentController = require('./paymentController');
const cryptoController = require('./cryptoController');

// Ad delivery route
router.get('/fetch-ad', adController.getAdForUser);

// Card/Bank Payment route (Naira/USD via Flutterwave or Paystack)
router.post('/payment/verify', paymentController.verifyAdPayment);

// Crypto Payment route (Trust Wallet / BSC Network)
router.post('/payment/crypto', cryptoController.initializeCryptoPayment);

module.exports = router;
