// ============================================================
//  BahaBasket — Test Data Seeder
//  Creates: 20 dummy sellers + shops + 100 products (5 per seller)
//  Run: node seed-test-data.js
// ============================================================

require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// ─── SELLERS DATA ────────────────────────────────────────────
const SELLERS = [
  { name: 'Rajan Sharma',    email: 'rajan.sharma.test@bahabasket.dev',    phone: '9111100001' },
  { name: 'Priya Mehta',     email: 'priya.mehta.test@bahabasket.dev',     phone: '9111100002' },
  { name: 'Suresh Patel',    email: 'suresh.patel.test@bahabasket.dev',    phone: '9111100003' },
  { name: 'Anita Verma',     email: 'anita.verma.test@bahabasket.dev',     phone: '9111100004' },
  { name: 'Deepak Joshi',    email: 'deepak.joshi.test@bahabasket.dev',    phone: '9111100005' },
  { name: 'Sunita Gupta',    email: 'sunita.gupta.test@bahabasket.dev',    phone: '9111100006' },
  { name: 'Manoj Tiwari',    email: 'manoj.tiwari.test@bahabasket.dev',    phone: '9111100007' },
  { name: 'Kavita Singh',    email: 'kavita.singh.test@bahabasket.dev',    phone: '9111100008' },
  { name: 'Rahul Agarwal',   email: 'rahul.agarwal.test@bahabasket.dev',   phone: '9111100009' },
  { name: 'Meena Yadav',     email: 'meena.yadav.test@bahabasket.dev',     phone: '9111100010' },
  { name: 'Vikram Chauhan',  email: 'vikram.chauhan.test@bahabasket.dev',  phone: '9111100011' },
  { name: 'Pooja Rajput',    email: 'pooja.rajput.test@bahabasket.dev',    phone: '9111100012' },
  { name: 'Sandeep Kumar',   email: 'sandeep.kumar.test@bahabasket.dev',   phone: '9111100013' },
  { name: 'Rekha Mishra',    email: 'rekha.mishra.test@bahabasket.dev',    phone: '9111100014' },
  { name: 'Anil Saxena',     email: 'anil.saxena.test@bahabasket.dev',     phone: '9111100015' },
  { name: 'Nisha Pandey',    email: 'nisha.pandey.test@bahabasket.dev',    phone: '9111100016' },
  { name: 'Ramesh Dubey',    email: 'ramesh.dubey.test@bahabasket.dev',    phone: '9111100017' },
  { name: 'Geeta Srivastava',email: 'geeta.srivastava.test@bahabasket.dev',phone: '9111100018' },
  { name: 'Ashok Bhatt',     email: 'ashok.bhatt.test@bahabasket.dev',     phone: '9111100019' },
  { name: 'Lalita Sharma',   email: 'lalita.sharma.test@bahabasket.dev',   phone: '9111100020' },
];

// ─── SHOPS DATA ──────────────────────────────────────────────
const SHOPS = [
  { name: 'Sharma Cloth House',      category: ['men-fashion'],         city: 'Indore',    address: 'Shop 12, Gandhi Nagar',   description: 'Premium kurta, sherwani aur ethnic wear collection. 20 saal ki purani dukaan.' },
  { name: 'Priya Fashion Studio',    category: ['women-fashion'],       city: 'Indore',    address: 'G-15, Vijay Nagar',       description: 'Ladies suits, saree, lehenga aur designer blouse. Stitching bhi available.' },
  { name: 'Patel Electronics Hub',   category: ['electronics'],         city: 'Bhopal',    address: 'M.G. Road, Near Bus Stand',description: 'TV, AC, fridge, washing machine aur sabhi home appliances milte hain.' },
  { name: 'Anita Kids World',         category: ['kids-wear'],           city: 'Indore',    address: 'Plot 7, Rajwada Road',    description: 'Bacchon ke kapde, shoes, toys aur accessories. 0 se 14 saal tak.' },
  { name: 'Joshi Mobile Zone',        category: ['mobile-accessories'],  city: 'Ujjain',    address: 'Freeganj, Main Road',     description: 'Sabhi brands ke mobile covers, chargers, earphones aur accessories.' },
  { name: 'Sunita Saree Center',      category: ['women-fashion'],       city: 'Indore',    address: 'Sarafa Bazaar, Old Indore',description: 'Pure silk saree, cotton saree, banarasi, kanjivaram aur designer saree.' },
  { name: 'Tiwari Footwear Palace',   category: ['footwear'],            city: 'Bhopal',    address: 'Hamidia Road, Shop 45',   description: 'Gents, ladies aur kids ke liye sabhi tarah ke joote, chappal aur sandal.' },
  { name: 'Kavita Jewel House',       category: ['jewellery'],           city: 'Gwalior',   address: 'Lashkar, Sarafa Bazar',   description: 'Imitation jewellery, silver ornaments, bangles aur bridal set.' },
  { name: 'Agarwal Home Decor',       category: ['home-decor'],          city: 'Indore',    address: 'South Tukoganj, Shop 22', description: 'Ghar ki saajawat ke liye furniture, curtains, diyas aur decorative items.' },
  { name: 'Meena Grocery Mart',       category: ['groceries'],           city: 'Ujjain',    address: 'Dewas Gate, Near Temple',  description: 'Fresh atta, dal, masale, dry fruits aur organic products home delivery available.' },
  { name: 'Vikram Sports Corner',     category: ['sports'],              city: 'Indore',    address: 'Palasia, Shop 8',         description: 'Cricket kit, football, badminton, gym equipment aur sports accessories.' },
  { name: 'Pooja Beauty Parlour',     category: ['beauty'],              city: 'Bhopal',    address: 'MP Nagar Zone-1',         description: 'Skincare, haircare, makeup aur beauty products. Leading brands available.' },
  { name: 'Kumar Book Stall',         category: ['books'],               city: 'Indore',    address: 'MG Road, Near Library',   description: 'School books, competitive exam guides, novels aur stationery items.' },
  { name: 'Rekha Toy Land',           category: ['toys'],                city: 'Gwalior',   address: 'City Centre, Near Park',  description: 'Educational toys, board games, remote control cars aur soft toys.' },
  { name: 'Saxena Men\'s Wear',       category: ['men-fashion'],         city: 'Jabalpur',  address: 'Sadar, Main Bazaar',      description: 'Formal shirts, trousers, suits aur casual wear. All sizes available.' },
  { name: 'Nisha Designer Boutique',  category: ['women-fashion'],       city: 'Indore',    address: 'New Palasia, Shop 3',     description: 'Designer suits, kurtis, Indo-western wear aur custom stitching.' },
  { name: 'Dubey Hardware Store',     category: ['home-decor'],          city: 'Bhopal',    address: 'Bittan Market, Shop 18',  description: 'Ghar ke liye tools, paint, fixtures aur plumbing materials.' },
  { name: 'Geeta Organic Kitchen',    category: ['groceries'],           city: 'Indore',    address: 'Vijay Nagar, Plot 11',    description: 'Organic grains, cold-pressed oils, natural spices aur health foods.' },
  { name: 'Bhatt Electronics World',  category: ['electronics'],         city: 'Ujjain',    address: 'Tower Chowk, Near Bank',  description: 'Laptops, tablets, cameras aur computer accessories best price pe.' },
  { name: 'Lalita Fashion Mall',      category: ['women-fashion','kids-wear'], city: 'Jabalpur', address: 'Napier Town, Shop 7', description: 'Ladies aur kids ke liye latest fashion, affordable price mein quality products.' },
];

// ─── PRODUCTS DATA (5 per seller, 100 total) ────────────────
const PRODUCTS_PER_SHOP = [
  // Shop 0 — Sharma Cloth House (men-fashion)
  [
    { name: 'Cotton Pathani Kurta - White',   category: 'men-fashion',   price: 799,  mrp: 1200, stock: 50, description: 'Pure cotton pathani kurta, comfortable aur stylish. XS se 3XL tak available.', images: ['https://images.unsplash.com/photo-1594938298603-c8148c4b4f5a?w=400'] },
    { name: 'Silk Sherwani - Navy Blue',      category: 'men-fashion',   price: 3499, mrp: 5000, stock: 15, description: 'Shaadi ke liye silk sherwani, heavy embroidery ke saath. Perfect wedding wear.', images: ['https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400'] },
    { name: 'Linen Kurta Set - Beige',        category: 'men-fashion',   price: 1299, mrp: 1800, stock: 30, description: 'Linen kurta aur pajama set. Summers ke liye best choice, breathable fabric.', images: ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400'] },
    { name: 'Embroidered Nehru Jacket',       category: 'men-fashion',   price: 1599, mrp: 2200, stock: 25, description: 'Traditional Nehru jacket, festive occasions ke liye perfect. Cotton-silk blend.', images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'] },
    { name: 'Kurta Pajama Set - Maroon',      category: 'men-fashion',   price: 1099, mrp: 1600, stock: 40, description: 'Festive wear kurta pajama set, heavy work ke saath. Eid aur Diwali special.', images: ['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400'] },
  ],
  // Shop 1 — Priya Fashion Studio (women-fashion)
  [
    { name: 'Banarasi Silk Saree - Red',      category: 'women-fashion', price: 4500, mrp: 7000, stock: 20, description: 'Pure Banarasi silk saree, zari work ke saath. Shaadi aur pooja ke liye perfect.', images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400'] },
    { name: 'Anarkali Suit - Teal Green',     category: 'women-fashion', price: 2199, mrp: 3200, stock: 18, description: 'Georgette anarkali suit with dupatta, ready to wear. Eid special collection.', images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400'] },
    { name: 'Cotton Kurti - Floral Print',    category: 'women-fashion', price: 599,  mrp: 999,  stock: 80, description: 'Daily wear cotton kurti, bright floral print. Comfortable aur washable.', images: ['https://images.unsplash.com/photo-1594938298603-c8148c4b4f5a?w=400'] },
    { name: 'Lehenga Choli - Pink',           category: 'women-fashion', price: 5999, mrp: 9000, stock: 10, description: 'Wedding lehenga choli, heavy embroidery aur mirror work ke saath. Bridal special.', images: ['https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400'] },
    { name: 'Palazzo Suit Set - Lavender',    category: 'women-fashion', price: 1399, mrp: 2000, stock: 35, description: 'Trendy palazzo pant suit set, 3 piece. Office aur casual outing ke liye.', images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400'] },
  ],
  // Shop 2 — Patel Electronics Hub (electronics)
  [
    { name: 'Samsung 43" Smart TV - 4K',      category: 'electronics',   price: 28999, mrp: 38000, stock: 12, description: 'Samsung crystal 4K UHD Smart TV, built-in wifi, Netflix, YouTube support.', images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=400'] },
    { name: 'LG 1.5 Ton Split AC',            category: 'electronics',   price: 32000, mrp: 42000, stock: 8,  description: '5 star rated, inverter AC. Bijli bachata hai, thanda rakhta hai. 1 saal warranty.', images: ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400'] },
    { name: 'Whirlpool 260L Refrigerator',    category: 'electronics',   price: 22500, mrp: 29000, stock: 6,  description: 'Double door fridge, no frost technology, 260 litre capacity. Energy efficient.', images: ['https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400'] },
    { name: 'Sony 5.1 Home Theatre System',   category: 'electronics',   price: 18999, mrp: 26000, stock: 10, description: 'Powerful surround sound, Bluetooth, USB, HDMI. Party ke liye perfect.', images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400'] },
    { name: 'Havells Mixer Grinder 750W',     category: 'electronics',   price: 2799,  mrp: 4500,  stock: 25, description: '3 jar mixer grinder, 750W motor, 5 year warranty. Indian kitchen ke liye best.', images: ['https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400'] },
  ],
  // Shop 3 — Anita Kids World (kids-wear)
  [
    { name: 'Boys School Uniform Set',        category: 'kids-wear',     price: 599,  mrp: 899,  stock: 100, description: 'Complete school uniform set — shirt, pant, tie aur belt. All sizes 4-14 yr.', images: ['https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400'] },
    { name: 'Girls Frock - Rainbow Colors',   category: 'kids-wear',     price: 449,  mrp: 699,  stock: 60,  description: 'Soft cotton frock, bright colors, comfortable for daily wear. Age 2-10 yr.', images: ['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400'] },
    { name: 'Winter Jacket for Boys',         category: 'kids-wear',     price: 899,  mrp: 1399, stock: 40,  description: 'Warm fleece-lined jacket with hood, water resistant. Perfect for winters.', images: ['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400'] },
    { name: 'Kids Ethnic Wear Set - Diwali',  category: 'kids-wear',     price: 799,  mrp: 1200, stock: 30,  description: 'Festive dhoti kurta for boys. Sharara set for girls. Age 1-12 yr.', images: ['https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400'] },
    { name: 'Baby Romper 3-Pack',             category: 'kids-wear',     price: 699,  mrp: 999,  stock: 50,  description: 'Soft organic cotton rompers for newborns to 18 months. Machine washable.', images: ['https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400'] },
  ],
  // Shop 4 — Joshi Mobile Zone (mobile-accessories)
  [
    { name: 'iPhone 15 Silicone Case - Black', category: 'mobile-accessories', price: 349, mrp: 699,  stock: 200, description: 'Premium silicone case, exact fit for iPhone 15. Drop protection with soft lining.', images: ['https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=400'] },
    { name: '20W Fast Charger + Cable Combo',  category: 'mobile-accessories', price: 299, mrp: 599,  stock: 150, description: 'Type-C fast charger 20W, 1m braided cable ke saath. All Android phones compatible.', images: ['https://images.unsplash.com/photo-1588702547954-4800cccf5a21?w=400'] },
    { name: 'Wireless Earbuds - TWS Pro',      category: 'mobile-accessories', price: 999, mrp: 1999, stock: 80,  description: '30hr battery backup, IPX5 waterproof, ANC feature. Crystal clear sound.', images: ['https://images.unsplash.com/photo-1572336753783-4abb2faa8fca?w=400'] },
    { name: 'Tempered Glass Pack of 3',        category: 'mobile-accessories', price: 149, mrp: 299,  stock: 500, description: '9H hardness tempered glass, full coverage, anti-fingerprint coating. Pack of 3.', images: ['https://images.unsplash.com/photo-1604671801908-06d2e8e2c5c0?w=400'] },
    { name: 'Pop Socket Grip + Stand',         category: 'mobile-accessories', price: 199, mrp: 399,  stock: 300, description: 'Stylish pop socket, 360° rotation, works as stand bhi. Universal fit.', images: ['https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400'] },
  ],
  // Shop 5 — Sunita Saree Center (women-fashion)
  [
    { name: 'Kanjivaram Silk Saree - Gold',   category: 'women-fashion', price: 8500,  mrp: 12000, stock: 8,  description: 'Pure Kanjivaram silk, heavy zari border. South Indian tradition ki shaan.', images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400'] },
    { name: 'Chanderi Cotton Saree - Blue',   category: 'women-fashion', price: 1800,  mrp: 2800,  stock: 25, description: 'Light chanderi cotton saree, hand-block print. Summer favourite.', images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400'] },
    { name: 'Georgette Party Wear Saree',     category: 'women-fashion', price: 2500,  mrp: 3800,  stock: 20, description: 'Embellished georgette saree, sequence work ke saath. Party aur functions ke liye.', images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400'] },
    { name: 'Linen Saree with Blouse Piece',  category: 'women-fashion', price: 1200,  mrp: 1800,  stock: 40, description: 'Handloom linen saree, plain weave with contrast border. Office wear perfect.', images: ['https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400'] },
    { name: 'Patola Silk Saree - Multicolor', category: 'women-fashion', price: 6000,  mrp: 9000,  stock: 12, description: 'Traditional Patola design silk saree. Collector\'s item, handwoven.', images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400'] },
  ],
  // Shop 6 — Tiwari Footwear Palace (footwear)
  [
    { name: 'Leather Oxford Shoes - Brown',   category: 'footwear', price: 1899, mrp: 2999, stock: 30, description: 'Genuine leather Oxford shoes, formal wear ke liye best. Sizes 6-12 available.', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'] },
    { name: 'Ladies Block Heel Sandals',       category: 'footwear', price: 799,  mrp: 1299, stock: 45, description: 'Trendy block heel sandals, comfortable aur stylish. Party wear bhi, daily bhi.', images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400'] },
    { name: 'Sports Running Shoes - Black',    category: 'footwear', price: 1499, mrp: 2499, stock: 35, description: 'Lightweight running shoes with cushioned sole. Gym, jogging aur outdoor ke liye.', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'] },
    { name: 'Kolhapuri Chappal - Leather',     category: 'footwear', price: 699,  mrp: 1099, stock: 60, description: 'Traditional Kolhapuri chappal, handcrafted genuine leather. Men\'s sizes 6-11.', images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400'] },
    { name: 'Kids School Shoes - White',       category: 'footwear', price: 549,  mrp: 899,  stock: 80, description: 'Durable school shoes for kids, non-slip sole, easy velcro. Sizes 1-7.', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'] },
  ],
  // Shop 7 — Kavita Jewel House (jewellery)
  [
    { name: 'Kundan Bridal Necklace Set',      category: 'jewellery', price: 3500,  mrp: 5500,  stock: 15, description: 'Heavy kundan necklace set with earrings and tikka. Bridal jewellery special.', images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400'] },
    { name: 'Silver Payal (Anklet) Pair',      category: 'jewellery', price: 899,  mrp: 1400,  stock: 40, description: 'Pure 925 silver payal, traditional ghungroo design. Weight 25g approx.', images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400'] },
    { name: 'Oxidized Earrings Set of 5',      category: 'jewellery', price: 499,  mrp: 799,   stock: 100, description: 'Trendy oxidized silver earrings, 5 different designs. Ethnic aur boho look.', images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400'] },
    { name: 'Gold Plated Mangalsutra',         category: 'jewellery', price: 1200, mrp: 1900,  stock: 25, description: 'Beautiful gold-plated mangalsutra, black beads ke saath. Traditional design.', images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400'] },
    { name: 'Pearl Bracelet - Adjustable',     category: 'jewellery', price: 399,  mrp: 699,   stock: 60, description: 'Freshwater pearl bracelet, adjustable size. Office aur casual wear perfect.', images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400'] },
  ],
  // Shop 8 — Agarwal Home Decor (home-decor)
  [
    { name: 'Hand-painted Madhubani Wall Art', category: 'home-decor', price: 1299, mrp: 2000, stock: 20, description: 'Original Madhubani painting on canvas, 18x24 inch. Ghar ki shobha badhaye.', images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400'] },
    { name: 'Brass Diya Set of 12',            category: 'home-decor', price: 599,  mrp: 999,  stock: 50, description: 'Pure brass diyas, Diwali special. Heavy quality, long lasting. Pooja ke liye.', images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'] },
    { name: 'Jute Macramé Wall Hanging',       category: 'home-decor', price: 799,  mrp: 1299, stock: 30, description: 'Handcrafted jute macramé, boho style. Living room aur bedroom ke liye perfect.', images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'] },
    { name: 'Ceramic Flower Vase Set (3 Pc)',  category: 'home-decor', price: 899,  mrp: 1400, stock: 25, description: 'Hand-painted ceramic vases, 3 different sizes. Table decoration ke liye.', images: ['https://images.unsplash.com/photo-1484700782483-4cbb6e9eb0e1?w=400'] },
    { name: 'Wooden Photo Frame Set of 6',    category: 'home-decor', price: 699,  mrp: 1099, stock: 40, description: 'Solid wood photo frames, 6 different sizes. Wall arrangement ke liye perfect.', images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400'] },
  ],
  // Shop 9 — Meena Grocery Mart (groceries)
  [
    { name: 'Organic Basmati Rice 5kg',        category: 'groceries', price: 549,  mrp: 699,  stock: 200, description: 'Pure organic basmati rice, extra long grain. Biryani aur pulao ke liye perfect.' },
    { name: 'Cold Pressed Mustard Oil 1L',     category: 'groceries', price: 199,  mrp: 280,  stock: 150, description: 'Kacchi ghani sarson ka tel, pure aur natural. No additives, no preservatives.' },
    { name: 'Mixed Dry Fruits Box 500g',        category: 'groceries', price: 699,  mrp: 999,  stock: 80,  description: 'Premium dry fruits — kaju, badam, kishmish, pista. Gift pack bhi available.' },
    { name: 'Whole Spice Kit - 12 Items',       category: 'groceries', price: 399,  mrp: 599,  stock: 100, description: 'Pure whole spices — jeera, dhaniya, laung, elaichi aur 8 more. Sealed packing.' },
    { name: 'Multi-grain Atta 10kg',            category: 'groceries', price: 449,  mrp: 599,  stock: 100, description: '10 grain atta — gehun, jowar, bajra, makka aur more. High fibre, healthy.' },
  ],
  // Shop 10 — Vikram Sports Corner (sports)
  [
    { name: 'SG Cricket Bat - English Willow', category: 'sports', price: 2999, mrp: 4500, stock: 15, description: 'SG English Willow cricket bat, full size (6). Leather ball ke liye perfect.', images: ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400'] },
    { name: 'Badminton Racket Pair + Net',      category: 'sports', price: 899,  mrp: 1499, stock: 30, description: 'Li-Ning badminton rackets pair with shuttlecocks aur net. Complete set.', images: ['https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400'] },
    { name: 'Nivia Football - Size 5',          category: 'sports', price: 599,  mrp: 999,  stock: 25, description: 'Nivia storm football size 5, machine stitched, suitable for all surfaces.', images: ['https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400'] },
    { name: 'Adjustable Dumbbell Pair 5kg',    category: 'sports', price: 1199, mrp: 1800, stock: 20, description: 'Cast iron adjustable dumbbells, 5kg pair. Home gym ke liye best investment.', images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'] },
    { name: 'Yoga Mat Anti-Slip 6mm',           category: 'sports', price: 499,  mrp: 899,  stock: 60, description: 'Extra thick 6mm yoga mat, non-slip surface. Free carry bag ke saath.', images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400'] },
  ],
  // Shop 11 — Pooja Beauty Parlour (beauty)
  [
    { name: 'Lakme Foundation SPF 25',         category: 'beauty', price: 349, mrp: 549, stock: 80, description: 'Lakme Invisible finish foundation, SPF 25. Lightweight, natural finish, 6 shades.' },
    { name: 'Mamaearth Vitamin C Face Wash',   category: 'beauty', price: 199, mrp: 299, stock: 120, description: 'Natural vitamin C face wash, tan removal aur skin brightening. Paraben free.' },
    { name: 'Biotique Bio Almond Scrub',        category: 'beauty', price: 149, mrp: 249, stock: 100, description: 'Ayurvedic almond scrub, gentle exfoliation. Weekly use ke liye perfect.' },
    { name: 'L\'Oreal Hair Color - Dark Brown', category: 'beauty', price: 299, mrp: 449, stock: 60, description: 'Ammonia-free hair color, 100% grey coverage. Easy home application kit.' },
    { name: 'Beardo Beard Oil - Argan',         category: 'beauty', price: 249, mrp: 399, stock: 70, description: 'Pure argan + jojoba beard oil, taming aur conditioning ke liye. 30ml bottle.' },
  ],
  // Shop 12 — Kumar Book Stall (books)
  [
    { name: 'NCERT Class 10 Complete Set',      category: 'books', price: 899,  mrp: 1299, stock: 30, description: 'Sabhi NCERT books class 10 — Maths, Science, Social, English, Hindi. Set of 8 books.', images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400'] },
    { name: 'Drishti IAS GS Manual 2025',       category: 'books', price: 499,  mrp: 799,  stock: 50, description: 'UPSC GS comprehensive manual, updated syllabus. Hindi medium available.', images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'] },
    { name: 'Harry Potter Box Set (7 Books)',    category: 'books', price: 2199, mrp: 3500, stock: 15, description: 'Complete Harry Potter series in English, hardcover edition. Collector\'s delight.', images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400'] },
    { name: 'Atomic Habits - Hindi Edition',    category: 'books', price: 299,  mrp: 499,  stock: 40, description: 'James Clear ki best-seller book "Atomic Habits" ab Hindi mein. Life-changing.', images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400'] },
    { name: 'MP Board Sample Papers 2025',      category: 'books', price: 149,  mrp: 249,  stock: 100, description: 'Class 12 MP Board sample papers, 10 sets each subject. Latest pattern ke anusar.', images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'] },
  ],
  // Shop 13 — Rekha Toy Land (toys)
  [
    { name: 'LEGO Classic Brick Box 500 Pcs',   category: 'toys', price: 1999, mrp: 2999, stock: 20, description: 'Original LEGO classic bricks, 500 pieces. Imagination badhaye, creativity develop kare.', images: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400'] },
    { name: 'Remote Control Car - Buggy',       category: 'toys', price: 1299, mrp: 2199, stock: 25, description: '4WD remote control buggy car, rechargeable battery. Off-road bhi chalti hai.', images: ['https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400'] },
    { name: 'Wooden Puzzle Set (Age 3-6)',       category: 'toys', price: 499,  mrp: 799,  stock: 40, description: 'Safe wooden puzzles, 5 different designs. Educational aur fun both.', images: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400'] },
    { name: 'Play-Doh 10 Color Set',            category: 'toys', price: 399,  mrp: 649,  stock: 60, description: 'Original Play-Doh 10 vibrant colors, non-toxic, safe for kids age 3+.', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'] },
    { name: 'Board Game - Ludo + Snakes',       category: 'toys', price: 249,  mrp: 399,  stock: 80, description: 'Classic combo board game — Ludo aur Snakes & Ladders. Family fun guaranteed.', images: ['https://images.unsplash.com/photo-1640461470346-c8b56497850a?w=400'] },
  ],
  // Shop 14 — Saxena Men's Wear (men-fashion)
  [
    { name: 'Formal Shirt - Blue Striped',      category: 'men-fashion', price: 899,  mrp: 1499, stock: 45, description: 'Premium cotton formal shirt, slim fit. Office wear ke liye ideal. XS-3XL.', images: ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400'] },
    { name: 'Slim Fit Chinos - Khaki',          category: 'men-fashion', price: 1199, mrp: 1999, stock: 35, description: 'Stretch slim-fit chinos, comfortable for all day. Formal aur casual both.', images: ['https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400'] },
    { name: 'Woolen Blazer - Charcoal Grey',    category: 'men-fashion', price: 2999, mrp: 4500, stock: 15, description: 'Premium wool blend blazer, single button. Meetings aur events ke liye.', images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'] },
    { name: 'Cotton Casual T-Shirt Pack 3',     category: 'men-fashion', price: 699,  mrp: 1199, stock: 70, description: 'Pack of 3 solid color t-shirts, round neck. 100% cotton, pre-shrunk fabric.', images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400'] },
    { name: 'Denim Jeans - Dark Blue',          category: 'men-fashion', price: 1499, mrp: 2299, stock: 40, description: 'Stretchable dark blue denim jeans, slim fit. Premium quality, long lasting.', images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=400'] },
  ],
  // Shop 15 — Nisha Designer Boutique (women-fashion)
  [
    { name: 'Designer Embroidered Kurti',       category: 'women-fashion', price: 1299, mrp: 1999, stock: 30, description: 'Heavy embroidery designer kurti, festive wear. Rayon fabric, comfortable fit.', images: ['https://images.unsplash.com/photo-1594938298603-c8148c4b4f5a?w=400'] },
    { name: 'Indo-Western Jumpsuit - Maroon',   category: 'women-fashion', price: 1799, mrp: 2699, stock: 20, description: 'Trendy indo-western jumpsuit, perfect for sangeet aur college functions.', images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400'] },
    { name: 'Sharara Set with Dupatta',         category: 'women-fashion', price: 2499, mrp: 3799, stock: 15, description: 'Gorgeous sharara set with dupatta, heavy work ke saath. Eid aur Diwali wear.', images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400'] },
    { name: 'Wrap Dress - Floral',              category: 'women-fashion', price: 999,  mrp: 1599, stock: 25, description: 'Chic floral wrap dress, adjustable fit. Beach, brunch aur casual outing ke liye.', images: ['https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400'] },
    { name: 'Co-ord Set - Pastel Blue',         category: 'women-fashion', price: 1699, mrp: 2499, stock: 22, description: 'Trendy pastel co-ord set (top + trouser). Instagram worthy look, perfect for outings.', images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400'] },
  ],
  // Shop 16 — Dubey Hardware Store (home-decor)
  [
    { name: 'Decorative LED String Lights 10m', category: 'home-decor', price: 299,  mrp: 499,  stock: 100, description: '10 metre LED fairy lights, warm white. Indoor/outdoor dono ke liye use ho sakti.', images: ['https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400'] },
    { name: 'Marble Ganesh Idol - 8 inch',      category: 'home-decor', price: 1499, mrp: 2299, stock: 12, description: 'Hand-carved white marble Ganesh idol, 8 inch. Mandir aur drawing room ke liye.', images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'] },
    { name: 'Bamboo Planter Stand Set 3',       category: 'home-decor', price: 899,  mrp: 1399, stock: 20, description: 'Eco-friendly bamboo planter stands, 3 sizes. Balcony garden aur indoor plants ke liye.', images: ['https://images.unsplash.com/photo-1484700782483-4cbb6e9eb0e1?w=400'] },
    { name: 'Tealight Candle Holder - Brass',  category: 'home-decor', price: 499,  mrp: 799,  stock: 35, description: 'Antique brass tealight holders, set of 4. Dining table aur mandir ke liye perfect.', images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400'] },
    { name: 'Rajasthani Door Hanging',          category: 'home-decor', price: 699,  mrp: 1099, stock: 25, description: 'Traditional Rajasthani door toran, mirror work ke saath. Ghar ki shubhta badhaye.', images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'] },
  ],
  // Shop 17 — Geeta Organic Kitchen (groceries)
  [
    { name: 'A2 Desi Cow Ghee 500ml',           category: 'groceries', price: 699,  mrp: 999,  stock: 60, description: 'Pure A2 desi cow ghee, hand-churned. Bilona process se bana, no adulterants.' },
    { name: 'Himalayan Pink Salt 1kg',           category: 'groceries', price: 149,  mrp: 249,  stock: 200, description: 'Pure Himalayan pink salt, mineral rich. Better than white salt, natural aur healthy.' },
    { name: 'Black Til Laddu (250g)',            category: 'groceries', price: 249,  mrp: 399,  stock: 80, description: 'Handmade black sesame laddus, jaggery se bane. No sugar, healthy mithai.' },
    { name: 'Ragi Flour Organic 2kg',            category: 'groceries', price: 199,  mrp: 299,  stock: 100, description: 'Stone-ground organic ragi flour. High calcium, perfect for rotis aur porridge.' },
    { name: 'Forest Honey Raw 500g',             category: 'groceries', price: 399,  mrp: 599,  stock: 50, description: 'Wild forest honey, unprocessed aur raw. Direct from beehive to bottle.' },
  ],
  // Shop 18 — Bhatt Electronics World (electronics)
  [
    { name: 'HP Laptop 15 - Core i5 12th Gen',  category: 'electronics', price: 52999, mrp: 65000, stock: 8, description: 'HP 15s laptop, i5 12th gen, 8GB RAM, 512GB SSD. Windows 11 ke saath. 1yr warranty.', images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'] },
    { name: 'Canon DSLR 1500D with Kit Lens',    category: 'electronics', price: 34999, mrp: 45000, stock: 5, description: 'Canon EOS 1500D, 18-55mm lens, 24.1MP. Photography lovers ke liye perfect entry DSLR.', images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400'] },
    { name: 'Boat Rockerz 450 Bluetooth Headphone', category: 'electronics', price: 999, mrp: 2999, stock: 40, description: 'Boat Rockerz 450, 15hr battery, 40mm drivers. Deep bass aur clear sound.', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'] },
    { name: 'Realme Narzo 60 5G',               category: 'electronics', price: 17999, mrp: 22000, stock: 12, description: 'Realme Narzo 60 5G, 8GB RAM, 128GB, 33W fast charge. Gamer\'s choice.', images: ['https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=400'] },
    { name: 'Lenovo Tab M10 Plus Tablet',        category: 'electronics', price: 15999, mrp: 20000, stock: 10, description: 'Lenovo M10 Plus, 10.6" FHD display, 4GB RAM, kids content ke liye best.', images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'] },
  ],
  // Shop 19 — Lalita Fashion Mall (women-fashion + kids-wear)
  [
    { name: 'Girls Party Frock - Purple',        category: 'kids-wear',     price: 799,  mrp: 1299, stock: 40, description: 'Beautiful purple net frock for girls, age 4-12. Birthday parties aur functions ke liye.', images: ['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400'] },
    { name: 'Women\'s Suit Set - Mustard',       category: 'women-fashion', price: 1499, mrp: 2199, stock: 25, description: 'Elegant mustard yellow suit set, embroidered. Diwali aur festive season special.', images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400'] },
    { name: 'Kids Denim Jacket & Jogger Set',    category: 'kids-wear',     price: 999,  mrp: 1599, stock: 30, description: 'Trendy kids denim jacket with matching jogger pants. Casual stylish look.', images: ['https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400'] },
    { name: 'Maxi Dress - Summer Floral',        category: 'women-fashion', price: 1299, mrp: 1999, stock: 20, description: 'Light breezy maxi dress, perfect for summer outings. Available in 5 colors.', images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400'] },
    { name: 'Boys Track Suit - Sports Edition',  category: 'kids-wear',     price: 699,  mrp: 1099, stock: 50, description: 'Comfortable cotton track suit for boys, age 4-14. School sports day ke liye.', images: ['https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400'] },
  ],
];

// ─── RATINGS (pre-fill some ratings) ───────────────────────
const RATINGS = [4.8, 4.5, 4.9, 4.3, 4.7, 4.6, 4.4, 4.8, 4.2, 4.6, 4.5, 4.7, 4.3, 4.9, 4.4, 4.8, 4.1, 4.6, 4.7, 4.5];
const REVIEW_COUNTS = [142, 89, 234, 67, 156, 198, 43, 312, 78, 95, 167, 203, 55, 178, 91, 124, 38, 145, 267, 83];

// ─── HELPER ──────────────────────────────────────────────────
function slug(name, suffix) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + suffix;
}

// ─── MAIN ─────────────────────────────────────────────────────
async function seed() {
  console.log('\n🌱  BahaBasket Test Data Seeder');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const createdUsers = [];
  const createdShops = [];

  // ── Step 1: Create Auth Users ─────────────────────────────
  console.log('👤  Step 1: Creating 20 auth users…');
  for (let i = 0; i < SELLERS.length; i++) {
    const seller = SELLERS[i];
    try {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email:          seller.email,
        password:       'Test@12345',
        email_confirm:  true,
        user_metadata:  { name: seller.name, phone: seller.phone }
      });
      if (error) {
        if (error.message && error.message.includes('already been registered')) {
          // User already exists — fetch existing
          const { data: existData } = await supabaseAdmin.auth.admin.listUsers();
          const existing = existData.users.find(u => u.email === seller.email);
          if (existing) {
            createdUsers.push({ id: existing.id, ...seller });
            console.log(`  ↩  [${i+1}/20] ${seller.name} (already exists)`);
          }
        } else {
          console.error(`  ✗  [${i+1}/20] ${seller.name}: ${error.message}`);
        }
      } else {
        createdUsers.push({ id: data.user.id, ...seller });
        console.log(`  ✓  [${i+1}/20] ${seller.name} — ${data.user.id}`);
      }
    } catch (e) {
      console.error(`  ✗  [${i+1}/20] ${seller.name}: ${e.message}`);
    }
  }
  console.log(`\n  Created/found ${createdUsers.length} users.\n`);

  // ── Step 2: Upsert public.users rows ─────────────────────
  console.log('📝  Step 2: Upserting public.users rows…');
  for (const u of createdUsers) {
    const { error } = await supabaseAdmin.from('users').upsert({
      id:    u.id,
      name:  u.name,
      email: u.email,
      phone: u.phone,
      role:  'seller',
    }, { onConflict: 'id' });
    if (error) console.error(`  ✗  ${u.name}: ${error.message}`);
    else       console.log(`  ✓  ${u.name}`);
  }

  // ── Step 3: Create Shops ──────────────────────────────────
  console.log('\n🏪  Step 3: Creating 20 shops…');
  for (let i = 0; i < Math.min(createdUsers.length, SHOPS.length); i++) {
    const u  = createdUsers[i];
    const sh = SHOPS[i];
    const ts = Date.now() + i;

    // Check if shop exists for this owner
    const { data: existing } = await supabaseAdmin
      .from('shops')
      .select('id')
      .eq('owner_id', u.id)
      .maybeSingle();

    if (existing) {
      createdShops.push({ id: existing.id, ownerId: u.id, idx: i });
      console.log(`  ↩  [${i+1}/20] ${sh.name} (already exists)`);
      continue;
    }

    const { data, error } = await supabaseAdmin.from('shops').insert({
      owner_id:     u.id,
      name:         sh.name,
      slug:         slug(sh.name, ts),
      category:     sh.category,
      description:  sh.description,
      whatsapp:     `91${u.phone}`,
      address:      sh.address,
      city:         sh.city,
      plan:         i < 8 ? 'premium' : 'free',
      is_active:    true,
      is_verified:  i < 8,
      rating:       RATINGS[i],
      review_count: REVIEW_COUNTS[i],
    }).select('id').single();

    if (error) {
      console.error(`  ✗  [${i+1}/20] ${sh.name}: ${error.message}`);
    } else {
      createdShops.push({ id: data.id, ownerId: u.id, idx: i });
      console.log(`  ✓  [${i+1}/20] ${sh.name} — ${data.id}`);
    }
  }
  console.log(`\n  Created/found ${createdShops.length} shops.\n`);

  // ── Step 4: Create Products ───────────────────────────────
  console.log('📦  Step 4: Creating products (5 per shop = 100 total)…');
  let totalProducts = 0;

  for (const shopMeta of createdShops) {
    const shopIdx  = shopMeta.idx;
    const products = PRODUCTS_PER_SHOP[shopIdx];
    if (!products) continue;

    for (let p = 0; p < products.length; p++) {
      const prod = products[p];
      const ts   = Date.now() + shopIdx * 100 + p;

      // Check if product already exists in this shop with same name
      const { data: existing } = await supabaseAdmin
        .from('products')
        .select('id')
        .eq('shop_id', shopMeta.id)
        .eq('name', prod.name)
        .maybeSingle();

      if (existing) {
        console.log(`  ↩  [Shop ${shopIdx+1}|P${p+1}] ${prod.name} (exists)`);
        totalProducts++;
        continue;
      }

      const insertData = {
        shop_id:     shopMeta.id,
        name:        prod.name,
        slug:        slug(prod.name, ts),
        description: prod.description,
        price:       prod.price,
        mrp:         prod.mrp,
        category:    prod.category,
        stock:       prod.stock,
        is_active:   true,
      };
      if (prod.images && prod.images.length) insertData.images = prod.images;

      const { error } = await supabaseAdmin.from('products').insert(insertData);
      if (error) {
        console.error(`  ✗  [Shop ${shopIdx+1}|P${p+1}] ${prod.name}: ${error.message}`);
      } else {
        console.log(`  ✓  [Shop ${shopIdx+1}|P${p+1}] ${prod.name} — ₹${prod.price}`);
        totalProducts++;
      }
    }
  }

  // ── Summary ───────────────────────────────────────────────
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅  Seeding Complete!');
  console.log(`    👤 Users  : ${createdUsers.length}`);
  console.log(`    🏪 Shops  : ${createdShops.length}`);
  console.log(`    📦 Products: ${totalProducts}`);
  console.log('\n🔑  Seller Login Credentials:');
  console.log('    Email   : <naam>.test@bahabasket.dev  (e.g. rajan.sharma.test@bahabasket.dev)');
  console.log('    Password: Test@12345');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

seed().catch(console.error);
