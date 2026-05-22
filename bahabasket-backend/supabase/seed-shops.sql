-- ================================================================
--  BahaBasket — Test Shops Seed Data  (v2 — auto user detection)
--  Run this in Supabase Dashboard > SQL Editor
-- ================================================================

-- ── This block automatically uses your first registered user ────
-- ── No need to change anything — just Run! ──────────────────────

DO $$
DECLARE
  v_owner UUID;
BEGIN

  -- Get the first user from auth.users (your test account)
  SELECT id INTO v_owner FROM auth.users LIMIT 1;

  IF v_owner IS NULL THEN
    RAISE EXCEPTION 'No user found! Please register/login first on the website, then run this SQL.';
  END IF;

  -- Upsert owner into public.users if not already there
  INSERT INTO users (id, email, name, role)
  SELECT
    au.id,
    au.email,
    COALESCE(au.raw_user_meta_data->>'full_name', 'Demo User'),
    'seller'
  FROM auth.users au
  WHERE au.id = v_owner
  ON CONFLICT (id) DO UPDATE SET role = 'seller';

  -- Insert 12 test shops
  INSERT INTO shops (owner_id, name, slug, category, description, whatsapp, city, plan, is_active, is_verified, rating, review_count)
  VALUES

  (v_owner, 'Sharma Cloth House',      'sharma-cloth-house',
   ARRAY['men'],
   'Premium men''s clothing — kurta, shirt, trouser, suit — everything in one place. Wholesale also available.',
   '919876543210', 'Gandhi Nagar, Indore', 'growth', true, true, 4.8, 124),

  (v_owner, 'Digital Zone Electronics', 'digital-zone-electronics',
   ARRAY['electronics'],
   'Mobiles, laptops, earphones, chargers and all accessories. Best price guarantee.',
   '919876543211', 'Station Road, Indore', 'free', true, true, 4.5, 89),

  (v_owner, 'Meera Saree Center',       'meera-saree-center',
   ARRAY['women'],
   'Banarasi, Kanjivaram, Georgette — perfect sarees for every occasion. Blouse stitching available.',
   '919876543212', 'Sarafa Bazar, Indore', 'premium', true, true, 4.9, 210),

  (v_owner, 'Little Stars Kids Wear',   'little-stars-kids-wear',
   ARRAY['kids'],
   'Cute and comfortable clothing for newborns to 14 years. School uniforms, party wear, casual wear.',
   '919876543213', 'New Market, Indore', 'free', true, true, 4.6, 67),

  (v_owner, 'Rani Jewellery House',     'rani-jewellery-house',
   ARRAY['jewellery'],
   'Gold, silver, artificial and bridal jewellery. Custom designs available. Trusted for 25+ years.',
   '919876543214', 'Sarafa Bazar, Indore', 'premium', true, true, 4.9, 187),

  (v_owner, 'Royal Ethnic Wear',        'royal-ethnic-wear',
   ARRAY['ethnic-wear'],
   'Kurta sets, sherwanis, anarkalis, salwar suits — best collection for festivals and weddings.',
   '919876543215', 'MG Road, Indore', 'growth', true, true, 4.7, 142),

  (v_owner, 'Home Decor Palace',        'home-decor-palace',
   ARRAY['home-decor'],
   'Make your home beautiful — curtains, cushions, wall art, lights and much more.',
   '919876543216', 'Vijay Nagar, Indore', 'free', true, false, 4.1, 34),

  (v_owner, 'Leather Lane Bags',        'leather-lane-bags',
   ARRAY['bags-wallets'],
   'Ladies purses, men''s wallets, office bags, school bags — genuine leather and synthetic both available.',
   '919876543217', 'Vijay Nagar, Indore', 'free', true, true, 4.4, 88),

  (v_owner, 'Time Zone Watches',        'time-zone-watches',
   ARRAY['watches'],
   'Titan, Fastrack, Casio and imported brands. Battery replacement and repair also available.',
   '919876543218', 'Station Road, Indore', 'premium', true, true, 4.5, 63),

  (v_owner, 'Glow Beauty & Care',       'glow-beauty-care',
   ARRAY['beauty-care'],
   'Skincare, makeup, perfumes, hair care — all top brands at discounted prices.',
   '919876543219', 'Palasia, Indore', 'free', true, true, 4.6, 93),

  (v_owner, 'Champion Sports World',    'champion-sports-world',
   ARRAY['sports-fitness'],
   'Cricket, football, badminton, gym equipment, protein supplements — bulk order discounts available.',
   '919876543220', 'Civil Lines, Indore', 'free', true, false, 4.3, 77),

  (v_owner, 'Step Ahead Footwear',      'step-ahead-footwear',
   ARRAY['footwear'],
   'Men, women and kids footwear — sports shoes, sandals, formal shoes, chappals.',
   '919876543221', 'Rajwada, Indore', 'growth', true, true, 4.4, 55)

  ON CONFLICT (slug) DO NOTHING;

  RAISE NOTICE 'SUCCESS! 12 shops inserted for owner: %', v_owner;

END $$;


-- ── Confirm: See all shops ────────────────────────────────────────
SELECT name, category, city, plan, is_verified, rating
FROM shops
WHERE is_active = true
ORDER BY plan DESC, rating DESC;
