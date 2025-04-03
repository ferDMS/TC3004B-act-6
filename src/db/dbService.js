class DBService {
  constructor() {
    this.initialized = false;
  }

  async getAllCustomers() {
    if (!this.initialized) {
      throw new Error('Service not initialized');
    }
    throw new Error('Method not implemented');
  }

  async getCustomerById(_id) {
    if (!this.initialized) {
      throw new Error('Service not initialized');
    }
    throw new Error('Method not implemented');
  }

  async createCustomer(_name, _email) {
    if (!this.initialized) {
      throw new Error('Service not initialized');
    }
    throw new Error('Method not implemented');
  }

  async updateCustomer(_id, _name, _email) {
    if (!this.initialized) {
      throw new Error('Service not initialized');
    }
    throw new Error('Method not implemented');
  }

  async deleteCustomer(_id) {
    if (!this.initialized) {
      throw new Error('Service not initialized');
    }
    throw new Error('Method not implemented');
  }
}

module.exports = DBService;
