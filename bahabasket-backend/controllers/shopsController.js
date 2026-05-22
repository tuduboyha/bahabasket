// controllers/shopsController.js
const { supabase, supabaseAdmin } = require('../supabase/client');

// ─── List Shops ───────────────────────────────────────────────────────────────
exports.listShops = async (req, res, next) => {
  try {
    const { city, category, plan, search, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('shops')
      .select('id, name, slug, category, whatsapp, city, logo, cover_image, rating, review_count, plan, is_verified', { count: 'exact' })
      .eq('is_active', true)
      .order('is_verified', { ascending: false })
      .order('rating', { ascending: false })
      .range(offset, offset + limit - 1);

    if (city)     query = query.ilike('city', `%${city}%`);
    if (plan)     query = query.eq('plan', plan);
    if (search)   query = query.ilike('name', `%${search}%`);
    if (category) query = query.contains('category', [category]);

    const { data, error, count } = await query;
    if (error) throw error;

    res.json({ success: true, shops: data, total: count, page: +page, limit: +limit });
  } catch (err) { next(err); }
};

// ─── Get My Shop (current seller's shop) ─────────────────────────────────────
exports.getMyShop = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('shops')
      .select('*')
      .eq('owner_id', req.user.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    res.json({ success: true, shop: data || null });
  } catch (err) { next(err); }
};

// ─── Get Single Shop ──────────────────────────────────────────────────────────
exports.getShop = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { data, error } = await supabase
      .from('shops')
      .select('*, users(name, avatar)')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error || !data) return res.status(404).json({ success: false, error: 'Shop not found' });
    res.json({ success: true, shop: data });
  } catch (err) { next(err); }
};

// ─── Create Shop ──────────────────────────────────────────────────────────────
exports.createShop = async (req, res, next) => {
  try {
    const { name, category, description, whatsapp, address, city, pincode } = req.body;

    // Generate URL-safe slug from shop name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();

    const { data, error } = await supabase
      .from('shops')
      .insert({
        owner_id: req.user.id,
        name, slug, category, description, whatsapp, address, city, pincode,
        plan: 'free',
        is_active: true
      })
      .select()
      .single();

    if (error) throw error;

    // Update user role to seller
    await supabaseAdmin.from('users').update({ role: 'seller' }).eq('id', req.user.id);

    res.status(201).json({ success: true, shop: data });
  } catch (err) { next(err); }
};

// ─── Update Shop ──────────────────────────────────────────────────────────────
exports.updateShop = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const { data: shop } = await supabase.from('shops').select('owner_id').eq('id', id).single();
    if (!shop) return res.status(404).json({ success: false, error: 'Shop not found' });
    if (shop.owner_id !== req.user.id && req.userRole !== 'admin') {
      return res.status(403).json({ success: false, error: 'Not authorised to edit this shop' });
    }

    const allowed = ['name', 'description', 'whatsapp', 'address', 'city', 'pincode', 'logo', 'cover_image', 'category'];
    const updates = {};
    allowed.forEach(f => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

    const { data, error } = await supabase.from('shops').update(updates).eq('id', id).select().single();
    if (error) throw error;
    res.json({ success: true, shop: data });
  } catch (err) { next(err); }
};

// ─── Delete Shop ──────────────────────────────────────────────────────────────
exports.deleteShop = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('shops').update({ is_active: false }).eq('id', id);
    if (error) throw error;
    res.json({ success: true, message: 'Shop deactivated' });
  } catch (err) { next(err); }
};

// ─── Get Shop Products ────────────────────────────────────────────────────────
exports.getShopProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('shop_id', id)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, products: data });
  } catch (err) { next(err); }
};

// ─── Get Shop Reviews ─────────────────────────────────────────────────────────
exports.getShopReviews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('reviews')
      .select('*, users(name, avatar)')
      .eq('shop_id', id)
      .eq('type', 'shop')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, reviews: data });
  } catch (err) { next(err); }
};
