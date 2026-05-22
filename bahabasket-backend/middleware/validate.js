// middleware/validate.js
// Joi-based request validation middleware factory.
// Usage: router.post('/register', validate(schemas.register), handler)

const Joi = require('joi');

function validate(schema, property = 'body') {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    if (!error) return next();

    const details = error.details.map(d => d.message).join(', ');
    return res.status(422).json({ success: false, error: details });
  };
}

// ─── Common Schemas ────────────────────────────────────────────────────────────

const schemas = {

  // Auth
  register: Joi.object({
    name:     Joi.string().min(2).max(60).required(),
    email:    Joi.string().email().optional().allow(''),
    phone:    Joi.string().pattern(/^[6-9]\d{9}$/).required().messages({
                'string.pattern.base': 'Enter a valid 10-digit Indian mobile number'
              }),
    password: Joi.string().min(6).optional().allow(''),
    city:     Joi.string().max(60).optional().allow(''),
  }),

  login: Joi.object({
    email:    Joi.string().email().optional().allow(''),
    phone:    Joi.string().pattern(/^[6-9]\d{9}$/).optional().allow(''),
    password: Joi.string().min(6).optional().allow(''),
    otp:      Joi.string().length(6).optional().allow(''),
  }),

  // Shop
  createShop: Joi.object({
    name:        Joi.string().min(2).max(100).required(),
    category:    Joi.array().items(Joi.string()).min(1).required(),
    description: Joi.string().max(1000).optional().allow(''),
    whatsapp:    Joi.string().pattern(/^[6-9]\d{9}$/).required(),
    address:     Joi.string().max(300).optional().allow(''),
    city:        Joi.string().max(60).required(),
    pincode:     Joi.string().length(6).pattern(/^\d+$/).optional().allow(''),
  }),

  // Product
  createProduct: Joi.object({
    shop_id:     Joi.string().uuid().required(),
    name:        Joi.string().min(2).max(200).required(),
    description: Joi.string().max(2000).optional().allow(''),
    price:       Joi.number().positive().required(),
    mrp:         Joi.number().positive().optional(),
    category:    Joi.string().required(),
    stock:       Joi.number().integer().min(0).default(0),
  }),

  // Review
  createReview: Joi.object({
    shop_id:    Joi.string().uuid().optional(),
    product_id: Joi.string().uuid().optional(),
    type:       Joi.string().valid('shop', 'product').required(),
    rating:     Joi.number().integer().min(1).max(5).required(),
    title:      Joi.string().max(100).optional().allow(''),
    text:       Joi.string().min(10).max(1000).required(),
  }),

};

module.exports = { validate, schemas };
