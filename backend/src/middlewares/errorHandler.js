import { validationResult } from 'express-validator';
import { CustomError } from '../utils/error.util.js';

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
  if (err instanceof CustomError) {
    // Log para desarrollador
    if (err.devMessage) {
      console.error('[DEV]', err.devMessage, err.details || '');
    }
    return res.status(err.status).json({
      success: false,
      message: err.message || 'Error',
    });
  }

  // Errores no controlados
  console.error('[SERVER ERROR]', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
}

export default errorHandler;