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

// ─── Register (Phone or Email + Password) ────────────────────────────────────
exports.register = async (req, res, next) => {
  try {
    const { name, email, phone, password, city } = req.body;

    // Use phone-derived email if no real email provided
    const authEmail = (email && email.includes('@')) ? email : `${phone}@bahabasket.app`;
    const authPass  = password || phone; // fallback: phone number as password

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: authEmail,
      password: authPass
    });
    if (signUpError) throw signUpError;

    // Create user profile
    const { error: profileError } = await supabaseAdmin.from('users').insert({
      id:    signUpData.user.id,
      name,
      email: authEmail,
      phone,
      city:  city || '',
      role:  'buyer'
    });
    if (profileError) throw profileError;

    // Immediately sign in to get token (skips email verification requirement)
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: authPass
    });
    if (loginError) throw loginError;

    res.status(201).json({
      success: true,
      token: loginData.session.access_token,
      user: { ...loginData.user, name, phone, city }
    });
  } catch (err) { next(err); }
};

// ─── Login (Phone or Email + Password) ───────────────────────────────────────
exports.login = async (req, res, next) => {
  try {
    const { email, phone, password } = req.body;

    // Support phone-based login
    const authEmail = (email && email.includes('@')) ? email : `${phone}@bahabasket.app`;
    const authPass  = password || phone;

    const { data, error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPass });
    if (error) throw error;

    // Fetch user profile
    const { data: profile } = await supabase.from('users').select('*').eq('id', data.user.id).single();

    res.json({ success: true, token: data.session.access_token, user: profile || data.user });
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
