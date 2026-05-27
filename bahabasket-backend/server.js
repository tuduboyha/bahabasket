// ============================================================
//  BahaBasket Backend — Main Server
//  Tech: Node.js + Express + Supabase
//  Run: npm run dev  (development)  |  npm start  (production)
// ============================================================

require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const rateLimit  = require('express-rate-limit');

const app = express();

// ─── Security & Utility Middleware ────────────────────────────────────────────
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '10mb' }));    // 10mb for base64 image uploads
app.use(express.urlencoded({ extended: true }));

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'http://localhost:3000',
];
// Add FRONTEND_URL(s) from env — supports comma-separated list or '*' for all
if (process.env.FRONTEND_URL) {
  if (process.env.FRONTEND_URL === '*') {
    // Allow all origins (useful for dev / open API)
    allowedOrigins.push('*');
  } else {
    process.env.FRONTEND_URL.split(',').forEach(u => allowedOrigins.push(u.trim()));
  }
}
app.use(cors({
  origin: (origin, cb) => {
    // Allow no-origin requests (Postman, curl, mobile apps)
    if (!origin) return cb(null, true);
    // Allow all if '*' is in list
    if (allowedOrigins.includes('*')) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: Origin ${origin} not allowed`));
  },
  credentials: true
}));

// ─── Rate Limiting ────────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max:      200,               // limit each IP to 200 requests per windowMs
  message:  { success: false, error: 'Too many requests. Please try again after 15 minutes.' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      10,                // stricter limit for auth endpoints (OTP abuse prevention)
  message:  { success: false, error: 'Too many login attempts. Please try again later.' }
});

app.use('/api/', limiter);
app.use('/api/auth/', authLimiter);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    name:    'BahaBasket API',
    version: '1.0.0',
    status:  'running',
    time:    new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'healthy', uptime: process.uptime() });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth',          require('./routes/auth'));
app.use('/api/stats',         require('./routes/stats'));
app.use('/api/shops',         require('./routes/shops'));
app.use('/api/products',      require('./routes/products'));
app.use('/api/offers',        require('./routes/offers'));
app.use('/api/reviews',       require('./routes/reviews'));
app.use('/api/wishlist',      require('./routes/wishlist'));
app.use('/api/orders',        require('./routes/orders'));
app.use('/api/payments',      require('./routes/payments'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/upload',        require('./routes/upload'));
app.use('/api/saved-shops',   require('./routes/savedShops'));

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.method} ${req.path} not found` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(require('./middleware/errorHandler'));

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════╗');
  console.log('  ║   BahaBasket API Server  🛒             ║');
  console.log(`  ║   Running on http://localhost:${PORT}   ║`);
  console.log(`  ║   Mode: ${(process.env.NODE_ENV || 'development').padEnd(27)}║`);
  console.log('  ╚══════════════════════════════════════╝');
  console.log('');
});

module.exports = app;
