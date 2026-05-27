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

    // Use admin to create user — bypasses email confirmation requirement
    const { data: adminData, error: adminError } = await supabaseAdmin.auth.admin.createUser({
      email:            authEmail,
      password:         authPass,
      email_confirm:    true,   // mark email as already confirmed
      user_metadata:    { name, phone, city }
    });
    if (adminError) throw adminError;

    // Create user profile in our users table
    const { error: profileError } = await supabaseAdmin.from('users').insert({
      id:    adminData.user.id,
      name,
      email: authEmail,
      phone,
      city:  city || '',
      role:  'buyer'
    });
    if (profileError && !profileError.message.includes('duplicate')) throw profileError;

    // Sign in to get session token
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: authPass
    });
    if (loginError) throw loginError;

    // Fetch full profile from our users table
    const { data: profile } = await supabaseAdmin.from('users').select('*').eq('id', adminData.user.id).single();

    res.status(201).json({
      success: true,
      token: loginData.session.access_token,
      user: profile || { ...loginData.user, name, phone, city, role: 'buyer' }
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

    // Fetch user profile using admin client (bypasses RLS)
    const { data: profile } = await supabaseAdmin.from('users').select('*').eq('id', data.user.id).single();

    res.json({ success: true, token: data.session.access_token, user: profile || data.user });
  } catch (err) { next(err); }
};

// ─── Social Complete (Google / OAuth) ────────────────────────────────────────
// Called after OAuth redirect — ensures user exists in our users table
exports.socialComplete = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) return res.status(401).json({ success: false, error: 'Token required' });

    // Verify token and get user from Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) throw new Error('Invalid or expired token');

    // Extract profile info from Google metadata
    const meta   = user.user_metadata || {};
    const name   = meta.full_name || meta.name || (user.email || '').split('@')[0] || 'User';
    const email  = user.email || '';
    const avatar = meta.avatar_url || meta.picture || '';

    // Upsert into our users table (create if first time, update if existing)
    const { data: profile, error: upsertErr } = await supabaseAdmin
      .from('users')
      .upsert({ id: user.id, name, email, avatar, role: 'buyer' }, { onConflict: 'id' })
      .select()
      .single();

    if (upsertErr) throw upsertErr;

    res.json({ success: true, user: profile });
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
    const { data, error } = await supabaseAdmin
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
    const allowed = ['name', 'city', 'pincode', 'phone', 'dob', 'bio', 'language', 'avatar_url', 'categories', 'notification_prefs'];
    const updates = {};
    allowed.forEach(field => { if (req.body[field] !== undefined) updates[field] = req.body[field]; });

    if (!Object.keys(updates).length) {
      return res.status(400).json({ success: false, error: 'No valid fields to update' });
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .update(updates)
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, user: data });
  } catch (err) { next(err); }
};
