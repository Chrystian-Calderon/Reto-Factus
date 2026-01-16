import pool from "../config/db.js";

class Bodega {
  async create(data) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const query = `
        INSERT INTO bodegas (name, location)
        VALUES ($1, $2)
        RETURNING id
      `;
      const { rows } = await client.query(query, data);
      await client.query('COMMIT');
      return { id: rows[0].id, name: data[0], location: data[1] };
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
      SELECT id, name, location
      FROM bodegas
      WHERE name ILIKE $1 OR location ILIKE $1
      ORDER BY name
      LIMIT $2 OFFSET $3
    `;
    const { rows } = await pool.query(query, [searchQuery, limit, offset]);

    // Total count for pagination
    const countQuery = `
      SELECT COUNT(*)
      FROM bodegas
      WHERE name ILIKE $1 OR location ILIKE $1
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
      SELECT id, name, location
      FROM bodegas
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
        UPDATE bodegas
        SET name = $1, location = $2, updated_at = NOW()
        WHERE id = $3
        RETURNING id, name, location
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
        UPDATE bodegas
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

export default new Bodega();