// routes/orders.js
const express    = require('express');
const router     = express.Router();
const ordersCtrl = require('../controllers/ordersController');
const { requireAuth, requireRole } = require('../middleware/auth');

// All order routes require login
router.use(requireAuth);

// GET  /api/orders              → My orders (buyer) or shop orders (seller)
router.get('/', ordersCtrl.listOrders);

// GET  /api/orders/:id          → Single order detail
router.get('/:id', ordersCtrl.getOrder);

// POST /api/orders              → Place new order (via WhatsApp/chat)
router.post('/', ordersCtrl.createOrder);

// PATCH /api/orders/:id/status  → Update order status (seller/admin)
router.patch('/:id/status', ordersCtrl.updateStatus);

module.exports = router;
