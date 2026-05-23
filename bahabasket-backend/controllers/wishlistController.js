// controllers/wishlistController.js
const { supabaseAdmin } = require('../supabase/client');

exports.getWishlist = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('wishlists')
      .select('*, products(*, shops(name, slug, whatsapp))')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, wishlist: data });
  } catch (err) { next(err); }
};

exports.addToWishlist = async (req, res, next) => {
  try {
    const { product_id } = req.body;
    if (!product_id) return res.status(400).json({ success: false, error: 'product_id required' });

    const { data, error } = await supabaseAdmin
      .from('wishlists')
      .upsert({ user_id: req.user.id, product_id }, { onConflict: 'user_id,product_id' })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, item: data });
  } catch (err) { next(err); }
};

exports.removeFromWishlist = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const { error } = await supabaseAdmin
      .from('wishlists')
      .delete()
      .eq('user_id', req.user.id)
      .eq('product_id', product_id);

    if (error) throw error;
    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (err) { next(err); }
};
