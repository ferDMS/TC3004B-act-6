const DBService = require('../dbService');

class FakeService extends DBService {
  constructor() {
    super();
    this.customers = new Map();
    // Initialize with 5 dummy customers
    const dummyCustomers = [
      { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
      { id: '3', name: 'Bob Johnson', email: 'bob.johnson@example.com' },
      { id: '4', name: 'Alice Brown', email: 'alice.brown@example.com' },
      { id: '5', name: 'Charlie Wilson', email: 'charlie.wilson@example.com' },
    ];

    dummyCustomers.forEach((customer) => {
      this.customers.set(customer.id, customer);
    });
  }

  async getAllCustomers() {
    return Array.from(this.customers.values());
  }

  async getCustomerById(id) {
    return this.customers.get(id);
  }

  async createCustomer(name, email) {
    const id = Date.now().toString();
    const customer = { id, name, email };
    this.customers.set(id, customer);
    return customer;
  }

  async updateCustomer(id, name, email) {
    const customer = { id, name, email };
    this.customers.set(id, customer);
    return customer;
  }

  async deleteCustomer(id) {
    this.customers.delete(id);
  }
}

module.exports = FakeService;
