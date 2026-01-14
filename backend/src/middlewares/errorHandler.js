const { validationResult } = require('express-validator');

function errorHandler(err, req, res, next) {
  // Validaciones de express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(e => ({ field: e.param, message: e.msg }))
    });
  }

  // Errores personalizados
  if (err && err.status) {
    return res.status(err.status).json({
      success: false,
      message: err.message || 'Error',
      details: err.details || undefined
    });
  }

  // Errores no controlados
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
}

module.exports = errorHandler;
