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
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    // Dependency injection
    // Instead of initializing a controller inside the customer handler, we inject it. This way, we can:
    //  - Use a production environment controller, which runs the business logic and database calls
    //  - Use a testing mock environment, which only returns the result of unit tests

    const httpHandler = new CustomerHttpHandler(mockController);

    // Update method names to match the handler class
    app.get('/customers', httpHandler.getAllCustomers.bind(httpHandler));
    app.get('/customers/:id', httpHandler.getCustomerById.bind(httpHandler));
    app.post('/customers', httpHandler.createCustomer.bind(httpHandler));
    app.put('/customers/:id', httpHandler.updateCustomer.bind(httpHandler));
    app.delete('/customers/:id', httpHandler.deleteCustomer.bind(httpHandler));
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

  describe('POST /customers', () => {
    it('should create a new customer', async () => {
      const newCustomer = { id: 1, name: 'John Doe', email: 'john@example.com' };
      mockController.create.mockResolvedValue(newCustomer);

      const response = await request(app)
        .post('/customers')
        .send({ name: 'John Doe', email: 'john@example.com' })
        .expect(201);

      expect(response.body).toEqual(newCustomer);
      expect(mockController.create).toHaveBeenCalledWith('John Doe', 'john@example.com');
    });
  });

  describe('PUT /customers/:id', () => {
    it('should update a customer', async () => {
      const updatedCustomer = { id: 1, name: 'John Updated', email: 'john.updated@example.com' };
      mockController.update.mockResolvedValue(updatedCustomer);

      const response = await request(app)
        .put('/customers/1')
        .send({ name: 'John Updated', email: 'john.updated@example.com' })
        .expect(200);

      expect(response.body).toEqual(updatedCustomer);
      expect(mockController.update).toHaveBeenCalledWith('1', 'John Updated', 'john.updated@example.com');
    });
  });

  describe('DELETE /customers/:id', () => {
    it('should delete a customer', async () => {
      mockController.delete.mockResolvedValue({ message: 'Customer deleted successfully' });

      const response = await request(app)
        .delete('/customers/1')
        .expect(200);

      expect(response.body).toEqual({ message: 'Customer deleted successfully' });
      expect(mockController.delete).toHaveBeenCalledWith('1');
    });
  });
});
