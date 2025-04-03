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
}

module.exports = DBService;
