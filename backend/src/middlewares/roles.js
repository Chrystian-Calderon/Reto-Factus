// Middlewares para autorización por rol

export function isAdmin(req, res, next) {
  if (req.user?.role === 'admin') {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Acceso solo para administradores' });
}

export function isOperator(req, res, next) {
  if (req.user?.role === 'operador' || req.user?.role === 'admin') {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Acceso solo para operadores' });
}
