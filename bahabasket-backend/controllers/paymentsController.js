// controllers/paymentsController.js
// Razorpay integration for BahaBasket subscription plans
const Razorpay = require('razorpay');
const crypto   = require('crypto');
const { supabase } = require('../supabase/client');

const PLAN_PRICES = {
  free:    0,
  growth:  49900,   // ₹499 in paise
  premium: 99900    // ₹999 in paise
};

function getRazorpay() {
  return new Razorpay({
    key_id:     process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
}

// ─── Create Razorpay Order ────────────────────────────────────────────────────
exports.createOrder = async (req, res, next) => {
  try {
    const { plan, shop_id } = req.body;
    if (!PLAN_PRICES[plan] || plan === 'free') {
      return res.status(400).json({ success: false, error: 'Invalid plan or free plan requires no payment' });
    }

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount:   PLAN_PRICES[plan],
      currency: 'INR',
      receipt:  `bm_${shop_id}_${Date.now()}`,
      notes:    { shop_id, plan, user_id: req.user.id }
    });

    res.json({ success: true, order });
  } catch (err) { next(err); }
};

// ─── Verify Payment ───────────────────────────────────────────────────────────
exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, shop_id, plan } = req.body;

    // Signature verification
    const body      = razorpay_order_id + '|' + razorpay_payment_id;
    const expected  = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body).digest('hex');

    if (expected !== razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Payment verification failed. Please contact support.' });
    }

    // Activate subscription in DB
    const start  = new Date();
    const end    = new Date(start);
    end.setMonth(end.getMonth() + 1);   // 1-month subscription

    await supabase.from('subscriptions').insert({
      shop_id, plan,
      amount_paid: PLAN_PRICES[plan] / 100,
      start_date:  start.toISOString(),
      end_date:    end.toISOString(),
      payment_id:  razorpay_payment_id
    });

    // Update shop plan
    await supabase.from('shops').update({ plan }).eq('id', shop_id);

    res.json({ success: true, message: `${plan} plan activated until ${end.toDateString()}` });
  } catch (err) { next(err); }
};

// ─── Payment History ──────────────────────────────────────────────────────────
exports.paymentHistory = async (req, res, next) => {
  try {
    const { shop_id } = req.query;
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('shop_id', shop_id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, history: data });
  } catch (err) { next(err); }
};
