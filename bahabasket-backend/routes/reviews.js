// routes/reviews.js
const express     = require('express');
const router      = express.Router();
const reviewsCtrl = require('../controllers/reviewsController');
const { requireAuth, requireRole } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// GET  /api/reviews             → All reviews (filter: shop_id, product_id, type)
router.get('/', reviewsCtrl.listReviews);

// POST /api/reviews             → Submit a review (must be logged in)
router.post('/', requireAuth, validate(schemas.createReview), reviewsCtrl.createReview);

// PATCH /api/reviews/:id          → Update review content (owner only)
router.patch('/:id', requireAuth, reviewsCtrl.updateReview);

// PATCH /api/reviews/:id/helpful → Mark review as helpful (+1)
router.patch('/:id/helpful', requireAuth, reviewsCtrl.markHelpful);

// PATCH /api/reviews/:id/status  → Admin: approve/reject review
router.patch('/:id/status', requireAuth, requireRole('admin'), reviewsCtrl.updateStatus);

// DELETE /api/reviews/:id        → Delete (owner or admin)
router.delete('/:id', requireAuth, reviewsCtrl.deleteReview);

module.exports = router;
