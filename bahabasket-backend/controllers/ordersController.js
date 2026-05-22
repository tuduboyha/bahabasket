// controllers/ordersController.js
const { supabase } = require('../supabase/client');

exports.listOrders = async (req, res, next) => {
  try {
    const { data: userRow } = await supabase.from('users').select('role').eq('id', req.user.id).single();

    let query = supabase.from('orders').select('*, products(name, images), shops(name, whatsapp)').order('created_at', { ascending: false });

    if (userRow?.role === 'seller') {
      // Seller sees orders for their shop(s)
      const { data: shopIds } = await supabase.from('shops').select('id').eq('owner_id', req.user.id);
      const ids = (shopIds || []).map(s => s.id);
      query = query.in('shop_id', ids);
    } else {
      // Buyer sees their own orders
      query = query.eq('buyer_id', req.user.id);
    }

    const { data, error } = await query;
    if (error) throw error;
    res.json({ success: true, orders: data });
  } catch (err) { next(err); }
};

exports.getOrder = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, products(*), shops(*), users(*)')
      .eq('id', req.params.id)
      .single();

    if (error || !data) return res.status(404).json({ success: false, error: 'Order not found' });
    res.json({ success: true, order: data });
  } catch (err) { next(err); }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { shop_id, product_id, qty, size, color, total_price, via } = req.body;

    const { data, error } = await supabase.from('orders').insert({
      buyer_id: req.user.id,
      shop_id, product_id,
      qty: qty || 1, size, color, total_price,
      via: via || 'whatsapp',
      status: 'pending'
    }).select().single();

    if (error) throw error;
    res.status(201).json({ success: true, order: data });
  } catch (err) { next(err); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    const { data, error } = await supabase
      .from('orders').update({ status }).eq('id', req.params.id).select().single();

    if (error) throw error;
    res.json({ success: true, order: data });
  } catch (err) { next(err); }
};
