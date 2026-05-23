// controllers/productsController.js
const { supabase, supabaseAdmin } = require('../supabase/client');

exports.listProducts = async (req, res, next) => {
  try {
    const { category, city, search, min_price, max_price, page = 1, limit = 24 } = req.query;
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('products')
      .select('*, shops(id, name, slug, city, logo, whatsapp)', { count: 'exact' })
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (category)  query = query.eq('category', category);
    if (search)    query = query.ilike('name', `%${search}%`);
    if (min_price) query = query.gte('price', min_price);
    if (max_price) query = query.lte('price', max_price);
    if (city)      query = query.eq('shops.city', city);

    const { data, error, count } = await query;
    if (error) throw error;
    res.json({ success: true, products: data, total: count, page: +page, limit: +limit });
  } catch (err) { next(err); }
};

exports.getProduct = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, shops(*)')
      .eq('id', req.params.id)
      .single();

    if (error || !data) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true, product: data });
  } catch (err) { next(err); }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { shop_id, name, description, price, mrp, category, stock, sizes, colors, images, is_active } = req.body;

    // Verify shop ownership
    const { data: shop } = await supabaseAdmin.from('shops').select('owner_id').eq('id', shop_id).single();
    if (!shop || shop.owner_id !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorised for this shop' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const insertData = {
      shop_id, name, slug, description, price, category,
      stock: stock || 0,
      is_active: is_active !== undefined ? is_active : true
    };
    if (mrp)                      insertData.mrp    = mrp;
    if (sizes  && sizes.length)   insertData.sizes  = sizes;
    if (colors && colors.length)  insertData.colors = colors;
    if (images && images.length)  insertData.images = images;  // ← fix: images save karo

    const { data, error } = await supabaseAdmin.from('products').insert(insertData).select().single();

    if (error) throw error;
    res.status(201).json({ success: true, product: data });
  } catch (err) { next(err); }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const allowed = ['name', 'description', 'price', 'mrp', 'category', 'images', 'sizes', 'colors', 'stock', 'is_active'];
    const updates = {};
    allowed.forEach(f => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

    const { data, error } = await supabaseAdmin.from('products').update(updates).eq('id', req.params.id).select().single();
    if (error) throw error;
    res.json({ success: true, product: data });
  } catch (err) { next(err); }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { error } = await supabase.from('products').update({ is_active: false }).eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true, message: 'Product removed' });
  } catch (err) { next(err); }
};
