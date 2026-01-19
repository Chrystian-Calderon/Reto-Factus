import { generateToken, setAuthCookie } from '../services/auth.service.js';
import { throwCustomError } from '../utils/error.util.js';

class UserController {
  constructor({ UserModel }) {
    this.model = UserModel;
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await this.model.findByEmail(email);
      const valid = await this.model.validatePassword(user, password);
      if (!user || !valid) {
        throwCustomError('Credenciales inválidas', {
          status: 401,
          devMessage: `Intento de login fallido para email: ${email}`
        });
      }
      const { password: _pw, role_id: _rin, ...userData } = user;
      const token = generateToken({ id: user.id, role: user.role_name, name: user.name, email: user.email });
      setAuthCookie(res, token);
      res.json({ success: true, user: userData });
    } catch (error) {
      next(error);
    }
  }

  async getMe(req, res, next) {
    try {
      const { email, name, role } = req.user || {};
      if (!email || !name || !role) {
        return next(throwCustomError('Token inválido o usuario no autenticado', { devMessage: 'Token inválido o usuario no autenticado', status: 401, details: req.user }));
      }

      const user = await this.model.findByFields({ email, name, role });
      if (!user) {
        return next(throwCustomError('Usuario no encontrado', { status: 404 }));
      }
      const { password: _pw, role_id: _rin, ...userData } = user;
      res.json({ success: true, user: userData });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res) {
    res.clearCookie('token');
    res.json({ success: true, message: 'Cierre de sesión exitoso' });
  }
}

export default UserController;