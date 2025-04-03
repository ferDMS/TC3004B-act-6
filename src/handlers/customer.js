class CustomerHttpHandler {
  constructor(customerController) {
    // We use an injected controller instead of initializing one here
    // this.customerController = new CustomerHttpHandler()
    this.customerController = customerController;
  }

  async getAllCustomers(req, res) {
    try {
      const customers = await this.customerController.getAll();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCustomerById(req, res) {
    try {
      const customer = await this.customerController.getById(req.params.id);
      res.json(customer);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

// Export the class directly
module.exports = CustomerHttpHandler;
