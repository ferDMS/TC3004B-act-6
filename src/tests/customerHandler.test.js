const request = require('supertest');
const express = require('express');
const CustomerHttpHandler = require('../handlers/customer');

jest.mock('../controllers/customer');

describe('CustomerHttpHandler', () => {
  let app;
  let mockController;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    mockController = {
      getAll: jest.fn(),
      getById: jest.fn(),
    };

    // Dependency injection

    // Instead of initializing a controller inside the customer handler, we inject it.

    // This way, we can:
    //  - Use a production environment controller, which runs the business logic and database calls
    //  - Use a testing mock environment, which only returns the result of unit tests

    const httpHandler = new CustomerHttpHandler(mockController);

    // Update method names to match the handler class
    app.get('/customers', httpHandler.getAllCustomers.bind(httpHandler));
    app.get('/customers/:id', httpHandler.getCustomerById.bind(httpHandler));
  });

  describe('GET /customers', () => {
    it('should return all customers', async () => {
      const customers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
      ];
      mockController.getAll.mockResolvedValue(customers);

      const response = await request(app)
        .get('/customers')
        .expect(200);

      expect(response.body).toEqual(customers);
      expect(mockController.getAll).toHaveBeenCalled();
    });
  });

  describe('GET /customers/:id', () => {
    it('should return a customer by ID', async () => {
      const customer = { id: 1, name: 'John Doe', email: 'john@example.com' };
      mockController.getById.mockResolvedValue(customer);

      const response = await request(app)
        .get('/customers/1')
        .expect(200);

      expect(response.body).toEqual(customer);
      expect(mockController.getById).toHaveBeenCalledWith('1');
    });
  });
});
