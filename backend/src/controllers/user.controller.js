import { generateToken, setAuthCookie } from '../services/auth.service.js';

class UserController {
  constructor({ UserModel }) {
    this.model = UserModel;
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await this.model.findByEmail(email);
      const valid = await this.model.validatePassword(user, password);
      if (!user || !valid) {
        return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
      }
      const { password: _pw, role_id: _rin, ...userData } = user;
      const token = generateToken({ id: user.id, role: user.role_name, name: user.name, email: user.email });
      setAuthCookie(res, token);
      res.json({ success: true, user: userData });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
    }
  }

  async logout(req, res) {
    res.clearCookie('token');
    res.json({ success: true, message: 'Cierre de sesión exitoso' });
  }
}

export default UserController;