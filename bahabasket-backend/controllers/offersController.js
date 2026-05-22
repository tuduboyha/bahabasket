// controllers/offersController.js
const { supabase } = require('../supabase/client');

// ─── List Offers ──────────────────────────────────────────────────────────────
exports.listOffers = async (req, res, next) => {
  try {
    const { city, category, shop_id, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    const now = new Date().toISOString();

    let query = supabase
      .from('offers')
      .select(`
        *,
        shops(id, name, slug, city, logo, whatsapp),
        products(id, name, images, price, mrp, category)
      `, { count: 'exact' })
      .eq('is_active', true)
      .lte('valid_from', now)
      .gte('valid_till', now)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (shop_id)  query = query.eq('shop_id', shop_id);
    if (city)     query = query.eq('shops.city', city);
    if (category) query = query.eq('products.category', category);

    const { data, error, count } = await query;
    if (error) throw error;

    res.json({ success: true, offers: data, total: count, page: +page, limit: +limit });
  } catch (err) { next(err); }
};

// ─── Trending Offers ──────────────────────────────────────────────────────────
exports.trendingOffers = async (req, res, next) => {
  try {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('offers')
      .select('*, shops(name, slug, logo), products(name, images, price, mrp)')
      .eq('is_active', true)
      .gte('valid_till', now)
      .order('discount_pct', { ascending: false })
      .limit(10);

    if (error) throw error;
    res.json({ success: true, offers: data });
  } catch (err) { next(err); }
};

// ─── Get Offer ────────────────────────────────────────────────────────────────
exports.getOffer = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .select('*, shops(*), products(*)')
      .eq('id', req.params.id)
      .single();

    if (error || !data) return res.status(404).json({ success: false, error: 'Offer not found' });
    res.json({ success: true, offer: data });
  } catch (err) { next(err); }
};

// ─── Create Offer ─────────────────────────────────────────────────────────────
exports.createOffer = async (req, res, next) => {
  try {
    const { shop_id, product_id, discount_pct, discount_amt, title, valid_from, valid_till } = req.body;

    // Verify shop ownership
    const { data: shop } = await supabase.from('shops').select('owner_id').eq('id', shop_id).single();
    if (!shop || shop.owner_id !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorised for this shop' });
    }

    const { data, error } = await supabase.from('offers').insert({
      shop_id, product_id, discount_pct, discount_amt, title, valid_from, valid_till, is_active: true
    }).select().single();

    if (error) throw error;
    res.status(201).json({ success: true, offer: data });
  } catch (err) { next(err); }
};

// ─── Update Offer ─────────────────────────────────────────────────────────────
exports.updateOffer = async (req, res, next) => {
  try {
    const allowed = ['title', 'discount_pct', 'discount_amt', 'valid_from', 'valid_till', 'is_active'];
    const updates = {};
    allowed.forEach(f => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

    const { data, error } = await supabase.from('offers').update(updates).eq('id', req.params.id).select().single();
    if (error) throw error;
    res.json({ success: true, offer: data });
  } catch (err) { next(err); }
};

// ─── Delete Offer ─────────────────────────────────────────────────────────────
exports.deleteOffer = async (req, res, next) => {
  try {
    const { error } = await supabase.from('offers').update({ is_active: false }).eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true, message: 'Offer removed' });
  } catch (err) { next(err); }
};
