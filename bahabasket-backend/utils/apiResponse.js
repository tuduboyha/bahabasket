// utils/apiResponse.js
// Helper functions for consistent API responses across all controllers.

const success = (res, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({ success: true, ...data });
};

const error = (res, message = 'Something went wrong', statusCode = 500) => {
  return res.status(statusCode).json({ success: false, error: message });
};

const notFound = (res, resource = 'Resource') => {
  return res.status(404).json({ success: false, error: `${resource} not found` });
};

const unauthorized = (res, message = 'Unauthorized. Please log in.') => {
  return res.status(401).json({ success: false, error: message });
};

const forbidden = (res, message = 'Access denied.') => {
  return res.status(403).json({ success: false, error: message });
};

const validationError = (res, message) => {
  return res.status(422).json({ success: false, error: message });
};

module.exports = { success, error, notFound, unauthorized, forbidden, validationError };
