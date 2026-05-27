// routes/savedShops.js
const express    = require('express');
const router     = express.Router();
const ctrl       = require('../controllers/savedShopsController');
const { requireAuth } = require('../middleware/auth');

// GET    /api/saved-shops           → list user's saved shops
router.get('/',              requireAuth, ctrl.listSavedShops);

// POST   /api/saved-shops           → save a shop  { shop_id }
router.post('/',             requireAuth, ctrl.saveShop);

// DELETE /api/saved-shops/:shop_id  → remove saved shop
router.delete('/:shop_id',   requireAuth, ctrl.removeSavedShop);

module.exports = router;
