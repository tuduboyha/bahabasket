// routes/auth.js
const express = require('express');
const router  = express.Router();
const authCtrl = require('../controllers/authController');
const { validate, schemas } = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');

// POST /api/auth/send-otp       → Send OTP to phone number
router.post('/send-otp', authCtrl.sendOtp);

// POST /api/auth/verify-otp     → Verify OTP and log in
router.post('/verify-otp', authCtrl.verifyOtp);

// POST /api/auth/register       → Register with email + password
router.post('/register', validate(schemas.register), authCtrl.register);

// POST /api/auth/login          → Login with email + password
router.post('/login', validate(schemas.login), authCtrl.login);

// POST /api/auth/social-complete → After Google/OAuth login — ensure user exists in users table
router.post('/social-complete', authCtrl.socialComplete);

// POST /api/auth/logout         → Logout (client-side token removal + server signout)
router.post('/logout', requireAuth, authCtrl.logout);

// GET  /api/auth/me             → Get current logged-in user profile
router.get('/me', requireAuth, authCtrl.getMe);

// PATCH /api/auth/me            → Update current user profile
router.patch('/me', requireAuth, authCtrl.updateMe);

module.exports = router;
