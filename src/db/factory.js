const PostgresService = require('./postgres/service');
const MongoService = require('./mongo/service');
const FakeService = require('./fake/service');

class DBFactory {
  static create(type, connectionString) {
    switch (type.toLowerCase()) {
      case 'postgres':
        return new PostgresService(connectionString);
      case 'mongo':
        return new MongoService(connectionString);
      case 'fake':
        return new FakeService();
      default:
        throw new Error(`Unknown service type: ${type}`);
    }
  }
}

module.exports = DBFactory;
