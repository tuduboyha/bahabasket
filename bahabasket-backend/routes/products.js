// routes/products.js
const express     = require('express');
const router      = express.Router();
const productsCtrl = require('../controllers/productsController');
const { requireAuth } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// GET  /api/products             → List products (filters: category, city, search, price range)
router.get('/', productsCtrl.listProducts);

// GET  /api/products/:id         → Single product detail
router.get('/:id', productsCtrl.getProduct);

// POST /api/products             → Add new product (seller, must own the shop)
router.post('/', requireAuth, validate(schemas.createProduct), productsCtrl.createProduct);

// PATCH /api/products/:id        → Update product
router.patch('/:id', requireAuth, productsCtrl.updateProduct);

// DELETE /api/products/:id       → Delete product (soft delete: is_active = false)
router.delete('/:id', requireAuth, productsCtrl.deleteProduct);

module.exports = router;
