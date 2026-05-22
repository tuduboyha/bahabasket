// routes/notifications.js
const express        = require('express');
const router         = express.Router();
const notifCtrl      = require('../controllers/notificationsController');
const { requireAuth } = require('../middleware/auth');

router.use(requireAuth);

// GET   /api/notifications           → Get all notifications for current user
router.get('/', notifCtrl.listNotifications);

// PATCH /api/notifications/:id/read  → Mark one notification as read
router.patch('/:id/read', notifCtrl.markRead);

// PATCH /api/notifications/read-all  → Mark ALL as read
router.patch('/read-all', notifCtrl.markAllRead);

// DELETE /api/notifications/:id      → Delete a notification
router.delete('/:id', notifCtrl.deleteNotification);

module.exports = router;
