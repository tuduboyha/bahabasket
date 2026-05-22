// routes/shops.js
const express  = require('express');
const router   = express.Router();
const shopsCtrl = require('../controllers/shopsController');
const { requireAuth, requireRole } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// GET  /api/shops               → List shops (with filters: city, category, plan, search)
router.get('/', shopsCtrl.listShops);

// GET  /api/shops/mine          → Get current seller's own shop (must be before /:slug)
router.get('/mine', requireAuth, shopsCtrl.getMyShop);

// GET  /api/shops/:slug         → Single shop details by slug
router.get('/:slug', shopsCtrl.getShop);

// POST /api/shops               → Create new shop (seller only)
router.post('/', requireAuth, validate(schemas.createShop), shopsCtrl.createShop);

// PATCH /api/shops/:id          → Update shop (owner or admin)
router.patch('/:id', requireAuth, shopsCtrl.updateShop);

// DELETE /api/shops/:id         → Delete shop (admin only)
router.delete('/:id', requireAuth, requireRole('admin'), shopsCtrl.deleteShop);

// GET  /api/shops/:id/products  → Get all products of a shop
router.get('/:id/products', shopsCtrl.getShopProducts);

// GET  /api/shops/:id/reviews   → Get reviews for a shop
router.get('/:id/reviews', shopsCtrl.getShopReviews);

module.exports = router;
