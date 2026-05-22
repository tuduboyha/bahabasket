// routes/payments.js
// Razorpay integration for subscription plans (Free / Growth / Premium)
const express      = require('express');
const router       = express.Router();
const paymentsCtrl = require('../controllers/paymentsController');
const { requireAuth } = require('../middleware/auth');

// POST /api/payments/create-order   → Create Razorpay order for a plan
router.post('/create-order', requireAuth, paymentsCtrl.createOrder);

// POST /api/payments/verify         → Verify payment signature after Razorpay checkout
router.post('/verify', requireAuth, paymentsCtrl.verifyPayment);

// GET  /api/payments/history        → Payment history for a shop
router.get('/history', requireAuth, paymentsCtrl.paymentHistory);

module.exports = router;
