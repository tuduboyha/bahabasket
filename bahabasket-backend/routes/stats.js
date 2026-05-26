// routes/stats.js
const express    = require('express');
const router     = express.Router();
const statsCtrl  = require('../controllers/statsController');

// GET /api/stats  → Public stats (shop count, product count, cities)
router.get('/', statsCtrl.getStats);

module.exports = router;
