const { MongoClient } = require('mongodb');
const DBService = require('../dbService');

class MongoService extends DBService {
  constructor(connectionString) {
    super();
    this.init(connectionString);
  }

  async init(connectionString) {
    const client = await MongoClient.connect(connectionString);
    this.db = client.db();
    this.customers = this.db.collection('customers');
  }

  async getAllCustomers() {
    return this.customers.find({}).toArray();
  }

  async getCustomerById(id) {
    return this.customers.findOne({ _id: id });
  }

  async createCustomer(name, email) {
    const result = await this.customers.insertOne({ name, email });
    return { id: result.insertedId, name, email };
  }

  async updateCustomer(id, name, email) {
    await this.customers.updateOne(
      { _id: id },
      { $set: { name, email } },
    );
    return { id, name, email };
  }

  async deleteCustomer(id) {
    await this.customers.deleteOne({ _id: id });
  }
}

module.exports = MongoService;
