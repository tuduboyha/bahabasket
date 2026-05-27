// controllers/reviewsController.js
const { supabaseAdmin } = require('../supabase/client');

exports.listReviews = async (req, res, next) => {
  try {
    const { shop_id, product_id, type, user_id } = req.query;
    let query = supabaseAdmin
      .from('reviews')
      .select('*, users(name, avatar_url), shops(name, slug), products(name)')
      .order('created_at', { ascending: false });

    // If user_id provided, show all statuses for that user (for user dashboard)
    if (user_id) {
      query = query.eq('user_id', user_id);
    } else {
      query = query.eq('status', 'published'); // public view: only published
    }

    if (shop_id)    query = query.eq('shop_id', shop_id);
    if (product_id) query = query.eq('product_id', product_id);
    if (type)       query = query.eq('type', type);

    const { data, error } = await query;
    if (error) throw error;
    res.json({ success: true, reviews: data || [] });
  } catch (err) { next(err); }
};

exports.createReview = async (req, res, next) => {
  try {
    const { shop_id, product_id, type, rating, title, text } = req.body;

    // Prevent duplicate review
    const { data: existing } = await supabaseAdmin
      .from('reviews')
      .select('id')
      .eq('user_id', req.user.id)
      .eq(type === 'shop' ? 'shop_id' : 'product_id', type === 'shop' ? shop_id : product_id)
      .single();

    if (existing) return res.status(409).json({ success: false, error: 'You have already reviewed this ' + type });

    const { data, error } = await supabaseAdmin.from('reviews').insert({
      user_id: req.user.id,
      shop_id:    type === 'shop'    ? shop_id    : null,
      product_id: type === 'product' ? product_id : null,
      type, rating, title, text,
      status: 'published'
    }).select().single();

    if (error) throw error;

    if (type === 'shop' && shop_id) await updateShopRating(shop_id);

    res.status(201).json({ success: true, review: data, message: 'Review published successfully!' });
  } catch (err) { next(err); }
};

// ─── Update Review (owner only) ──────────────────────────────────────────────
exports.updateReview = async (req, res, next) => {
  try {
    const { rating, title, text } = req.body;
    const updates = {};
    if (rating !== undefined) updates.rating = rating;
    if (title  !== undefined) updates.title  = title;
    if (text   !== undefined) updates.text   = text;

    if (!Object.keys(updates).length)
      return res.status(400).json({ success: false, error: 'Nothing to update' });

    // Verify ownership
    const { data: existing } = await supabaseAdmin
      .from('reviews').select('user_id, shop_id, type').eq('id', req.params.id).single();
    if (!existing || existing.user_id !== req.user.id)
      return res.status(403).json({ success: false, error: 'Not your review' });

    const { data, error } = await supabaseAdmin
      .from('reviews').update(updates).eq('id', req.params.id).select().single();
    if (error) throw error;

    if (existing.type === 'shop' && existing.shop_id) await updateShopRating(existing.shop_id);

    res.json({ success: true, review: data });
  } catch (err) { next(err); }
};

exports.markHelpful = async (req, res, next) => {
  try {
    const { data: review } = await supabaseAdmin.from('reviews').select('helpful_count').eq('id', req.params.id).single();
    const { error } = await supabaseAdmin.from('reviews').update({ helpful_count: (review?.helpful_count || 0) + 1 }).eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) { next(err); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { data, error } = await supabaseAdmin.from('reviews').update({ status }).eq('id', req.params.id).select().single();
    if (error) throw error;

    if (status === 'published' && data.shop_id) await updateShopRating(data.shop_id);

    res.json({ success: true, review: data });
  } catch (err) { next(err); }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const { error } = await supabaseAdmin.from('reviews').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true, message: 'Review deleted' });
  } catch (err) { next(err); }
};

// ─── Helper: Recalculate Shop Rating ─────────────────────────────────────────
async function updateShopRating(shopId) {
  const { data } = await supabaseAdmin
    .from('reviews')
    .select('rating')
    .eq('shop_id', shopId)
    .eq('type', 'shop')
    .eq('status', 'published');

  if (!data || data.length === 0) return;
  const avg = data.reduce((s, r) => s + r.rating, 0) / data.length;

  await supabaseAdmin.from('shops').update({
    rating: Math.round(avg * 10) / 10,
    review_count: data.length
  }).eq('id', shopId);
}
