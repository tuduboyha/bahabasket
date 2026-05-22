// middleware/auth.js
// Verifies Supabase JWT from Authorization header.
// Usage: router.get('/protected', requireAuth, handler)

const { supabase } = require('../supabase/client');

/**
 * Middleware: requireAuth
 * Extracts Bearer token → verifies with Supabase → attaches req.user
 */
async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'No token provided. Please log in.' });
  }

  const token = authHeader.split(' ')[1];

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token. Please log in again.' });
  }

  req.user = data.user;   // { id, email, phone, ... }
  req.token = token;
  next();
}

/**
 * Middleware: requireRole
 * Usage: router.delete('/shop/:id', requireAuth, requireRole('admin'), handler)
 */
function requireRole(...roles) {
  return async (req, res, next) => {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', req.user.id)
      .single();

    if (error || !data) {
      return res.status(403).json({ success: false, error: 'User not found.' });
    }

    if (!roles.includes(data.role)) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Required role: ${roles.join(' or ')}`
      });
    }

    req.userRole = data.role;
    next();
  };
}

module.exports = { requireAuth, requireRole };
