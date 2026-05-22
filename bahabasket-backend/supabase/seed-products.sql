-- ================================================================
--  BahaBasket — Test Products Seed Data
--  Run this AFTER seed-shops.sql (shops must exist first)
--  Run in: Supabase Dashboard > SQL Editor > Run
-- ================================================================

DO $$
DECLARE
  v_shop_id UUID;
BEGIN

  -- Get first active shop (from seed-shops.sql)
  SELECT id INTO v_shop_id FROM shops WHERE is_active = true LIMIT 1;

  IF v_shop_id IS NULL THEN
    RAISE EXCEPTION 'No shop found! Please run seed-shops.sql first.';
  END IF;

  -- Insert 10 sample products
  INSERT INTO products (shop_id, name, slug, description, price, mrp, category, stock, is_active)
  VALUES

  (v_shop_id,
   'Premium Cotton Kurta Set – Festive 2024',
   'premium-cotton-kurta-set-' || floor(random()*100000)::text,
   'Premium quality cotton kurta with matching pyjama. Perfect for Eid, Diwali, and weddings. Available in all sizes.',
   599, 999, 'men', 50, true),

  (v_shop_id,
   'Formal Linen Shirt – Office Wear',
   'formal-linen-shirt-' || floor(random()*100000)::text,
   'Lightweight linen blend shirt for office and formal occasions. Wrinkle resistant and breathable fabric.',
   449, 699, 'men', 30, true),

  (v_shop_id,
   'Wedding Sherwani – Heavy Embroidery',
   'wedding-sherwani-heavy-' || floor(random()*100000)::text,
   'Magnificent heavy embroidered sherwani for groom and wedding guests. Zari work with silk lining.',
   3499, 5500, 'ethnic-wear', 15, true),

  (v_shop_id,
   'Men''s Pathani Suit – Eid Special',
   'mens-pathani-suit-eid-' || floor(random()*100000)::text,
   'Traditional Pathani suit in soft fabric. Comes with matching kameez and shalwar. Comfortable all-day wear.',
   799, 1299, 'men', 25, true),

  (v_shop_id,
   'Slim Fit Chino Trousers – Navy',
   'slim-fit-chino-navy-' || floor(random()*100000)::text,
   'Modern slim fit chino trousers in navy blue. Stretch fabric for comfort. Perfect for casual and semi-formal.',
   349, 599, 'men', 40, true),

  (v_shop_id,
   'Embroidered Nehru Jacket – Festive',
   'embroidered-nehru-jacket-' || floor(random()*100000)::text,
   'Elegant Nehru collar jacket with detailed embroidery. Pairs well with kurta sets and formal shirts.',
   1199, 1999, 'ethnic-wear', 20, true),

  (v_shop_id,
   'Men''s Cotton Dhoti Kurta Set',
   'mens-cotton-dhoti-kurta-' || floor(random()*100000)::text,
   'Traditional cotton dhoti kurta set. Comfortable for daily wear and religious occasions. Pure cotton fabric.',
   549, 899, 'ethnic-wear', 35, true),

  (v_shop_id,
   'Casual Linen Kurta – Summer',
   'casual-linen-kurta-summer-' || floor(random()*100000)::text,
   'Breezy linen kurta perfect for summer. Half sleeves available. Easy to wash and maintain.',
   399, 649, 'men', 45, true),

  (v_shop_id,
   'Pure Silk Kurta – Festive Edition',
   'pure-silk-kurta-festive-' || floor(random()*100000)::text,
   'Luxurious pure silk kurta for special occasions. Rich texture with subtle sheen. Dry clean recommended.',
   1499, 2199, 'men', 10, true),

  (v_shop_id,
   'Nehru Collar Kurta Set – Daily Wear',
   'nehru-collar-kurta-daily-' || floor(random()*100000)::text,
   'Smart Nehru collar kurta set in soft cotton blend. Great for office, outings, and casual occasions.',
   899, 1399, 'men', 30, true)

  ON CONFLICT (slug) DO NOTHING;

  RAISE NOTICE 'SUCCESS! Products seeded for shop: %', v_shop_id;

END $$;


-- ── Confirm: See all products ─────────────────────────────────
SELECT p.name, p.category, p.price, p.mrp, p.stock, p.is_active, s.name AS shop_name
FROM products p
JOIN shops s ON s.id = p.shop_id
WHERE p.is_active = true
ORDER BY p.created_at DESC;
