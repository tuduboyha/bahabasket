// controllers/statsController.js
const { supabaseAdmin } = require('../supabase/client');

exports.getStats = async (req, res, next) => {
  try {
    // Run all queries in parallel for speed
    const [shopsResult, prodsResult, cityResult] = await Promise.all([

      // Total active shops
      supabaseAdmin
        .from('shops')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true),

      // Total active products
      supabaseAdmin
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true),

      // Distinct cities from active shops
      supabaseAdmin
        .from('shops')
        .select('city')
        .eq('is_active', true)
        .not('city', 'is', null)
        .neq('city', '')
    ]);

    // Count distinct non-empty cities
    const citySet = new Set(
      (cityResult.data || [])
        .map(r => (r.city || '').trim().toLowerCase())
        .filter(Boolean)
    );

    res.json({
      success:       true,
      total_shops:   shopsResult.count  || 0,
      total_products: prodsResult.count || 0,
      total_cities:  citySet.size       || 0,
    });
  } catch (err) { next(err); }
};
