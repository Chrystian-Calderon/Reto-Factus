import pool from "../config/db.js";

class Producto {
  async create(data) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const query = `
				INSERT INTO productos (name, barcode, description, stock_min)
				VALUES ($1, $2, $3, $4)
				RETURNING id
			`;
      const { rows } = await client.query(query, data);
      await client.query('COMMIT');
      return { id: rows[0].id, name: data[0], barcode: data[1], description: data[2], stock_min: data[3] };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  async getAll({ search = '', page = 1, limit = 10 } = {}) {
    const offset = (page - 1) * limit;
    const searchQuery = `%${search}%`;
    const query = `
			SELECT id, name, barcode, description, stock_min
			FROM productos
			WHERE name ILIKE $1 OR barcode ILIKE $1 OR description ILIKE $1
			ORDER BY name
			LIMIT $2 OFFSET $3
		`;
    const { rows } = await pool.query(query, [searchQuery, limit, offset]);

    // Total count for pagination
    const countQuery = `
			SELECT COUNT(*)
			FROM productos
			WHERE name ILIKE $1 OR barcode ILIKE $1 OR description ILIKE $1
		`;
    const { rows: countRows } = await pool.query(countQuery, [searchQuery]);
    const total = parseInt(countRows[0].count, 10);

    return {
      data: rows,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    };
  }

  async getById(id) {
    const query = `
			SELECT id, name, barcode, description, stock_min
			FROM productos
			WHERE id = $1
		`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  async update(id, data) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const query = `
				UPDATE productos
				SET name = $1, description = $2, stock_min = $3, updated_at = NOW()
				WHERE id = $4
				RETURNING id, name, description, stock_min
			`;
      const { rows } = await client.query(query, [...data, id]);
      await client.query('COMMIT');
      return rows[0];
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  async delete(id) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const query = `
				UPDATE productos
				SET deleted_at = NOW()
				WHERE id = $1
			`;
      await client.query(query, [id]);
      await client.query('COMMIT');
      return { success: true };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }
}

export default new Producto();