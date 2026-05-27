-- ============================================================
--  BahaBasket — Complete Database Schema for Supabase
--  Run this entire file in: Supabase → SQL Editor → Run
--  Order matters — foreign keys are referenced in sequence.
-- ============================================================

-- Enable UUID extension (already enabled in Supabase by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ──────────────────────────────────────────────────────────────
-- 1. CITIES
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cities (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  slug       TEXT NOT NULL UNIQUE,
  state      TEXT NOT NULL DEFAULT 'Rajasthan',
  is_active  BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed: initial Rajasthan cities
INSERT INTO cities (name, slug, state) VALUES
  ('Jaipur',      'jaipur',      'Rajasthan'),
  ('Jodhpur',     'jodhpur',     'Rajasthan'),
  ('Udaipur',     'udaipur',     'Rajasthan'),
  ('Kota',        'kota',        'Rajasthan'),
  ('Ajmer',       'ajmer',       'Rajasthan'),
  ('Bikaner',     'bikaner',     'Rajasthan'),
  ('Alwar',       'alwar',       'Rajasthan'),
  ('Bhilwara',    'bhilwara',    'Rajasthan'),
  ('Sikar',       'sikar',       'Rajasthan'),
  ('Pali',        'pali',        'Rajasthan')
ON CONFLICT (slug) DO NOTHING;


-- ──────────────────────────────────────────────────────────────
-- 2. USERS
-- Extends Supabase auth.users (same UUID as auth.users.id)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT,
  email      TEXT,
  phone      TEXT UNIQUE,
  role       TEXT NOT NULL DEFAULT 'buyer' CHECK (role IN ('buyer', 'seller', 'admin')),
  city       TEXT DEFAULT '',
  pincode    TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  dob        TEXT DEFAULT '',
  bio        TEXT DEFAULT '',
  language   TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Service role full access to users"
  ON users USING (auth.role() = 'service_role');


-- ──────────────────────────────────────────────────────────────
-- 3. SHOPS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS shops (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  category     TEXT[] NOT NULL DEFAULT '{}',
  description  TEXT DEFAULT '',
  whatsapp     TEXT NOT NULL,
  address      TEXT DEFAULT '',
  city         TEXT NOT NULL,
  pincode      TEXT DEFAULT '',
  logo         TEXT DEFAULT '',
  cover_image  TEXT DEFAULT '',
  rating       NUMERIC(3,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  plan         TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'growth', 'premium')),
  is_verified  BOOLEAN NOT NULL DEFAULT false,
  is_active    BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE shops ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active shops"
  ON shops FOR SELECT USING (is_active = true);

CREATE POLICY "Sellers can create shops"
  ON shops FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Sellers can update own shops"
  ON shops FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Service role full access to shops"
  ON shops USING (auth.role() = 'service_role');

-- Indexes for common filter queries
CREATE INDEX IF NOT EXISTS idx_shops_city     ON shops(city);
CREATE INDEX IF NOT EXISTS idx_shops_plan     ON shops(plan);
CREATE INDEX IF NOT EXISTS idx_shops_owner_id ON shops(owner_id);


-- ──────────────────────────────────────────────────────────────
-- 4. PRODUCTS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id     UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  price       NUMERIC(10,2) NOT NULL,
  mrp         NUMERIC(10,2),
  category    TEXT NOT NULL,
  images      TEXT[] DEFAULT '{}',
  sizes       TEXT[] DEFAULT '{}',
  colors      TEXT[] DEFAULT '{}',
  stock       INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT USING (is_active = true);

CREATE POLICY "Shop owner can manage products"
  ON products FOR ALL USING (
    EXISTS (SELECT 1 FROM shops WHERE shops.id = products.shop_id AND shops.owner_id = auth.uid())
  );

CREATE POLICY "Service role full access to products"
  ON products USING (auth.role() = 'service_role');

CREATE INDEX IF NOT EXISTS idx_products_shop_id  ON products(shop_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);


-- ──────────────────────────────────────────────────────────────
-- 5. OFFERS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS offers (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id       UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  product_id    UUID REFERENCES products(id) ON DELETE SET NULL,
  discount_pct  NUMERIC(5,2),          -- e.g. 30.00 = 30% off
  discount_amt  NUMERIC(10,2),         -- e.g. 100.00 = flat ₹100 off
  title         TEXT NOT NULL,
  valid_from    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  valid_till    TIMESTAMPTZ NOT NULL,
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active offers"
  ON offers FOR SELECT USING (is_active = true AND valid_till >= NOW());

CREATE POLICY "Shop owner can manage offers"
  ON offers FOR ALL USING (
    EXISTS (SELECT 1 FROM shops WHERE shops.id = offers.shop_id AND shops.owner_id = auth.uid())
  );

CREATE POLICY "Service role full access to offers"
  ON offers USING (auth.role() = 'service_role');

CREATE INDEX IF NOT EXISTS idx_offers_shop_id    ON offers(shop_id);
CREATE INDEX IF NOT EXISTS idx_offers_valid_till ON offers(valid_till);


-- ──────────────────────────────────────────────────────────────
-- 6. COUPONS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS coupons (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code       TEXT NOT NULL UNIQUE,
  type       TEXT NOT NULL CHECK (type IN ('pct', 'flat')),
  value      NUMERIC(10,2) NOT NULL,
  min_order  NUMERIC(10,2) DEFAULT 0,
  max_uses   INTEGER DEFAULT 100,
  used_count INTEGER DEFAULT 0,
  valid_till TIMESTAMPTZ NOT NULL,
  is_active  BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active coupons"
  ON coupons FOR SELECT USING (is_active = true AND valid_till >= NOW());

CREATE POLICY "Service role full access to coupons"
  ON coupons USING (auth.role() = 'service_role');


-- ──────────────────────────────────────────────────────────────
-- 7. ORDERS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  shop_id     UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  product_id  UUID REFERENCES products(id) ON DELETE SET NULL,
  qty         INTEGER NOT NULL DEFAULT 1,
  size        TEXT DEFAULT '',
  color       TEXT DEFAULT '',
  total_price NUMERIC(10,2) NOT NULL,
  status      TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')),
  via         TEXT NOT NULL DEFAULT 'whatsapp' CHECK (via IN ('whatsapp', 'chat', 'direct')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Buyers can view own orders"
  ON orders FOR SELECT USING (auth.uid() = buyer_id);

CREATE POLICY "Sellers can view orders for their shop"
  ON orders FOR SELECT USING (
    EXISTS (SELECT 1 FROM shops WHERE shops.id = orders.shop_id AND shops.owner_id = auth.uid())
  );

CREATE POLICY "Authenticated users can create orders"
  ON orders FOR INSERT WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Service role full access to orders"
  ON orders USING (auth.role() = 'service_role');

CREATE INDEX IF NOT EXISTS idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_shop_id  ON orders(shop_id);


-- ──────────────────────────────────────────────────────────────
-- 8. REVIEWS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  shop_id       UUID REFERENCES shops(id) ON DELETE CASCADE,
  product_id    UUID REFERENCES products(id) ON DELETE CASCADE,
  type          TEXT NOT NULL CHECK (type IN ('shop', 'product')),
  rating        SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title         TEXT DEFAULT '',
  text          TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'rejected')),
  helpful_count INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Prevent duplicate reviews (one user per shop/product)
  UNIQUE (user_id, shop_id),
  UNIQUE (user_id, product_id)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published reviews"
  ON reviews FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Service role full access to reviews"
  ON reviews USING (auth.role() = 'service_role');

CREATE INDEX IF NOT EXISTS idx_reviews_shop_id    ON reviews(shop_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);


-- ──────────────────────────────────────────────────────────────
-- 9. WISHLISTS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wishlists (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, product_id)
);

ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own wishlist"
  ON wishlists FOR ALL USING (auth.uid() = user_id);


-- ──────────────────────────────────────────────────────────────
-- 10. NOTIFICATIONS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type       TEXT NOT NULL,    -- 'order', 'review', 'offer', 'system'
  title      TEXT NOT NULL,
  message    TEXT NOT NULL,
  is_read    BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own notifications"
  ON notifications FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Service role can create notifications"
  ON notifications USING (auth.role() = 'service_role');

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);


-- ──────────────────────────────────────────────────────────────
-- 11. CHAT MESSAGES
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_messages (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  shop_id    UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  message    TEXT NOT NULL,
  sender     TEXT NOT NULL CHECK (sender IN ('buyer', 'seller')),
  is_read    BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Buyer can see own chat messages"
  ON chat_messages FOR SELECT USING (auth.uid() = buyer_id);

CREATE POLICY "Seller can see shop chat messages"
  ON chat_messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM shops WHERE shops.id = chat_messages.shop_id AND shops.owner_id = auth.uid())
  );

CREATE POLICY "Authenticated users can send messages"
  ON chat_messages FOR INSERT WITH CHECK (
    auth.uid() = buyer_id OR
    EXISTS (SELECT 1 FROM shops WHERE shops.id = chat_messages.shop_id AND shops.owner_id = auth.uid())
  );

CREATE INDEX IF NOT EXISTS idx_chat_buyer_shop ON chat_messages(buyer_id, shop_id);


-- ──────────────────────────────────────────────────────────────
-- 12. BLOGS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blogs (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  content      TEXT NOT NULL,
  author       TEXT NOT NULL DEFAULT 'BahaBasket Team',
  image        TEXT DEFAULT '',
  category     TEXT DEFAULT 'General',
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blogs"
  ON blogs FOR SELECT USING (is_published = true);

CREATE POLICY "Service role full access to blogs"
  ON blogs USING (auth.role() = 'service_role');


-- ──────────────────────────────────────────────────────────────
-- 13. SUBSCRIPTIONS
-- Tracks Razorpay payment history for shop plans
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscriptions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id     UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  plan        TEXT NOT NULL CHECK (plan IN ('free', 'growth', 'premium')),
  amount_paid NUMERIC(10,2) NOT NULL DEFAULT 0,
  start_date  TIMESTAMPTZ NOT NULL,
  end_date    TIMESTAMPTZ NOT NULL,
  payment_id  TEXT DEFAULT '',       -- Razorpay payment ID
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Shop owner can view own subscriptions"
  ON subscriptions FOR SELECT USING (
    EXISTS (SELECT 1 FROM shops WHERE shops.id = subscriptions.shop_id AND shops.owner_id = auth.uid())
  );

CREATE POLICY "Service role full access to subscriptions"
  ON subscriptions USING (auth.role() = 'service_role');


-- ──────────────────────────────────────────────────────────────
-- 14. BANNERS
-- Homepage promotional banners (managed by admin)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS banners (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image     TEXT NOT NULL,
  link      TEXT DEFAULT '',
  position  TEXT NOT NULL DEFAULT 'hero' CHECK (position IN ('hero', 'sidebar', 'popup')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active banners"
  ON banners FOR SELECT USING (is_active = true);

CREATE POLICY "Service role full access to banners"
  ON banners USING (auth.role() = 'service_role');


-- ──────────────────────────────────────────────────────────────
-- SUPABASE STORAGE: Create public image bucket
-- Run this separately in Supabase Storage tab, OR via SQL:
-- ──────────────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('bahabasket-images', 'bahabasket-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'bahabasket-images');

CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'bahabasket-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete own images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'bahabasket-images' AND auth.uid()::text = (storage.foldername(name))[1]);


-- ──────────────────────────────────────────────────────────────
-- REALTIME: Enable for live chat and notifications
-- ──────────────────────────────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;

-- ============================================================
--  SCHEMA COMPLETE ✓
--  14 tables created:
--  cities, users, shops, products, offers, coupons,
--  orders, reviews, wishlists, notifications,
--  chat_messages, blogs, subscriptions, banners
-- ============================================================
