// controllers/uploadController.js
// Uses Supabase Storage for image uploads.
// NOTE: For multipart parsing, install multer: npm install multer
const { supabaseAdmin } = require('../supabase/client');

const BUCKET = 'bahabasket-images';

exports.uploadImage = async (req, res, next) => {
  try {
    // Expect base64 data from frontend (simpler cross-platform approach)
    const { base64, fileName, contentType, folder } = req.body;

    if (!base64 || !fileName) {
      return res.status(400).json({ success: false, error: 'base64 and fileName required' });
    }

    const buffer   = Buffer.from(base64, 'base64');
    const path     = `${folder || 'general'}/${req.user.id}_${Date.now()}_${fileName}`;

    const { error } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, buffer, { contentType: contentType || 'image/jpeg', upsert: true });

    if (error) throw error;

    const { data: publicUrl } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);

    res.json({ success: true, url: publicUrl.publicUrl, path });
  } catch (err) { next(err); }
};

exports.deleteImage = async (req, res, next) => {
  try {
    const { path } = req.body;
    if (!path) return res.status(400).json({ success: false, error: 'path required' });

    const { error } = await supabaseAdmin.storage.from(BUCKET).remove([path]);
    if (error) throw error;
    res.json({ success: true, message: 'Image deleted' });
  } catch (err) { next(err); }
};
