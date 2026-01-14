import pool from "../config/db.js";
import { comparePassword } from '../services/auth.service.js';

class User {
  async findByEmail(email) {
    const query = `
      SELECT u.name, u.email, u.password, u.role_id, r.name AS role_name
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE email = $1
    `
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }

  async validatePassword(user, password) {
    if (!user) return false;
    return comparePassword(password, user.password);
  }
}

export default new User();