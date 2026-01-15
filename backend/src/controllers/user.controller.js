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

  async logout(req, res) {
    res.clearCookie('token');
    res.json({ success: true, message: 'Cierre de sesión exitoso' });
  }
}

export default UserController;