// routes/wishlist.js
const express      = require('express');
const router       = express.Router();
const wishlistCtrl = require('../controllers/wishlistController');
const { requireAuth } = require('../middleware/auth');

// All wishlist routes require login
router.use(requireAuth);

// GET    /api/wishlist           → Get current user's wishlist
router.get('/', wishlistCtrl.getWishlist);

// POST   /api/wishlist           → Add product to wishlist { product_id }
router.post('/', wishlistCtrl.addToWishlist);

// DELETE /api/wishlist/:product_id → Remove product from wishlist
router.delete('/:product_id', wishlistCtrl.removeFromWishlist);

module.exports = router;
