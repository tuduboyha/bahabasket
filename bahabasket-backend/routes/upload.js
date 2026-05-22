// routes/upload.js
// Supabase Storage — upload images for shops, products, blogs, etc.
const express     = require('express');
const router      = express.Router();
const uploadCtrl  = require('../controllers/uploadController');
const { requireAuth } = require('../middleware/auth');

// POST /api/upload/image   → Upload image → returns public URL
// Body: multipart/form-data with field "file" and optional "bucket" (default: "images")
router.post('/image', requireAuth, uploadCtrl.uploadImage);

// DELETE /api/upload/image → Delete image from Supabase Storage
// Body: { url: "https://..." }
router.delete('/image', requireAuth, uploadCtrl.deleteImage);

module.exports = router;
