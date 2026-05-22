// utils/slugify.js
// Generate URL-safe slugs from any string (supports Hindi/Hinglish too)

function slugify(text, suffix = '') {
  const slug = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')   // spaces and non-word chars → hyphen
    .replace(/^-+|-+$/g, '');    // trim leading/trailing hyphens

  return suffix ? `${slug}-${suffix}` : slug;
}

// Ensures uniqueness by appending timestamp
function uniqueSlug(text) {
  return slugify(text, Date.now().toString().slice(-6));
}

module.exports = { slugify, uniqueSlug };
