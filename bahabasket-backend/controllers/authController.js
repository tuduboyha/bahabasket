// controllers/authController.js
const { supabase, supabaseAdmin } = require('../supabase/client');

// ─── Send OTP ────────────────────────────────────────────────────────────────
exports.sendOtp = async (req, res, next) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ success: false, error: 'Phone number required' });

    const formattedPhone = `+91${phone}`;
    const { error } = await supabase.auth.signInWithOtp({ phone: formattedPhone });

    if (error) throw error;
    res.json({ success: true, message: 'OTP sent to ' + formattedPhone });
  } catch (err) { next(err); }
};

// ─── Verify OTP ──────────────────────────────────────────────────────────────
exports.verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ success: false, error: 'Phone and OTP required' });

    const formattedPhone = `+91${phone}`;
    const { data, error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp,
      type: 'sms'
    });

    if (error) throw error;

    // Upsert user record in our custom users table
    await supabaseAdmin.from('users').upsert({
      id:    data.user.id,
      phone: phone,
      role:  'buyer'
    }, { onConflict: 'id' });

    res.json({ success: true, token: data.session.access_token, user: data.user });
  } catch (err) { next(err); }
};

// ─── Register (Email + Password) ─────────────────────────────────────────────
exports.register = async (req, res, next) => {
  try {
    const { name, email, phone, password, city } = req.body;

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    // Create user profile in our users table
    const { error: profileError } = await supabaseAdmin.from('users').insert({
      id:    data.user.id,
      name,
      email,
      phone,
      city:  city || '',
      role:  'buyer'
    });
    if (profileError) throw profileError;

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please verify your email.',
      user: data.user
    });
  } catch (err) { next(err); }
};

// ─── Login (Email + Password) ─────────────────────────────────────────────────
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    res.json({ success: true, token: data.session.access_token, user: data.user });
  } catch (err) { next(err); }
};

// ─── Logout ───────────────────────────────────────────────────────────────────
exports.logout = async (req, res, next) => {
  try {
    await supabase.auth.signOut();
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (err) { next(err); }
};

// ─── Get Current User ─────────────────────────────────────────────────────────
exports.getMe = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) throw error;
    res.json({ success: true, user: data });
  } catch (err) { next(err); }
};

// ─── Update Current User ──────────────────────────────────────────────────────
exports.updateMe = async (req, res, next) => {
  try {
    const allowed = ['name', 'city', 'pincode', 'avatar'];
    const updates = {};
    allowed.forEach(field => { if (req.body[field] !== undefined) updates[field] = req.body[field]; });

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, user: data });
  } catch (err) { next(err); }
};
