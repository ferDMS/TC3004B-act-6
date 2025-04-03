const { Pool } = require('pg');
const DBService = require('../dbService');

class PostgresService extends DBService {
  constructor(connectionString) {
    super();
    this.db = new Pool({ connectionString });
  }

  async getAllCustomers() {
    const result = await this.db.query('SELECT * FROM customers');
    return result.rows;
  }

  async getCustomerById(id) {
    const result = await this.db.query('SELECT * FROM customers WHERE id = $1', [id]);
    return result.rows[0];
  }

  async createCustomer(name, email) {
    const result = await this.db.query(
      'INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING *',
      [name, email],
    );
    return result.rows[0];
  }

  async updateCustomer(id, name, email) {
    const result = await this.db.query(
      'UPDATE customers SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id],
    );
    return result.rows[0];
  }

  async deleteCustomer(id) {
    await this.db.query('DELETE FROM customers WHERE id = $1', [id]);
  }
}

module.exports = PostgresService;
