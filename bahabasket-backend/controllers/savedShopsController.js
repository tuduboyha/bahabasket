// controllers/savedShopsController.js
const { supabaseAdmin } = require('../supabase/client');

// GET /api/saved-shops  → list saved shops for current user
exports.listSavedShops = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('saved_shops')
      .select('id, created_at, shops(id, name, slug, category, city, rating, review_count, whatsapp, logo, is_verified, plan)')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    const shops = (data || []).map(row => ({ savedId: row.id, ...row.shops, savedAt: row.created_at }));
    res.json({ success: true, shops, total: shops.length });
  } catch (err) { next(err); }
};

// POST /api/saved-shops  → save a shop
exports.saveShop = async (req, res, next) => {
  try {
    const { shop_id } = req.body;
    if (!shop_id) return res.status(400).json({ success: false, error: 'shop_id required' });

    const { data, error } = await supabaseAdmin
      .from('saved_shops')
      .insert({ user_id: req.user.id, shop_id })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') // unique violation
        return res.status(409).json({ success: false, error: 'Shop already saved' });
      throw error;
    }
    res.status(201).json({ success: true, saved: data });
  } catch (err) { next(err); }
};

// DELETE /api/saved-shops/:shop_id  → remove saved shop
exports.removeSavedShop = async (req, res, next) => {
  try {
    const { error } = await supabaseAdmin
      .from('saved_shops')
      .delete()
      .eq('user_id', req.user.id)
      .eq('shop_id', req.params.shop_id);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) { next(err); }
};
