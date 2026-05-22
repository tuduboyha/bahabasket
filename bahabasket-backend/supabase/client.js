// supabase/client.js
// Single Supabase client instance shared across the entire backend.

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl     = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env');
}

// Node.js < 22 does not have native WebSocket — use 'ws' package as transport
const ws = require('ws');
const realtimeOpts = { transport: ws };

// Public client — respects Row Level Security (RLS). Use for user-facing queries.
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: realtimeOpts
});

// Admin client — bypasses RLS. Use ONLY in trusted server-side operations.
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth:     { autoRefreshToken: false, persistSession: false },
  realtime: realtimeOpts
});

module.exports = { supabase, supabaseAdmin };
