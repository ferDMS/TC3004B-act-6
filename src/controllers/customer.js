class CustomerController {
  constructor(service) {
    this.service = service;
  }

  async getAll() {
    return this.service.getAllCustomers();
  }

  async getById(id) {
    const customer = await this.service.getCustomerById(id);
    if (!customer) throw new Error('Customer not found new message');
    return customer;
  }
}

module.exports = CustomerController;
