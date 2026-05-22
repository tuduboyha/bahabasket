// routes/offers.js
const express    = require('express');
const router     = express.Router();
const offersCtrl = require('../controllers/offersController');
const { requireAuth } = require('../middleware/auth');

// GET  /api/offers              → All active offers (filter: city, category, shop)
router.get('/', offersCtrl.listOffers);

// GET  /api/offers/trending     → Top trending offers (most viewed/wished)
router.get('/trending', offersCtrl.trendingOffers);

// GET  /api/offers/:id          → Single offer detail
router.get('/:id', offersCtrl.getOffer);

// POST /api/offers              → Create offer (seller only)
router.post('/', requireAuth, offersCtrl.createOffer);

// PATCH /api/offers/:id         → Update offer
router.patch('/:id', requireAuth, offersCtrl.updateOffer);

// DELETE /api/offers/:id        → Delete offer
router.delete('/:id', requireAuth, offersCtrl.deleteOffer);

module.exports = router;
