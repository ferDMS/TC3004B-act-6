const CustomerController = require('../controllers/customer');

describe('CustomerController', () => {
  let mockService;
  let controller;

  beforeEach(() => {
    mockService = {
      getAllCustomers: jest.fn(),
      getCustomerById: jest.fn(),
    };
    controller = new CustomerController(mockService);
  });

  test('should get all customers', async () => {
    const customers = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
    mockService.getAllCustomers.mockResolvedValue(customers);

    const result = await controller.getAll();
    expect(result).toEqual(customers);
    expect(mockService.getAllCustomers).toHaveBeenCalledTimes(1);
  });

  test('should get customer by ID', async () => {
    const customer = { id: 1, name: 'John Doe', email: 'john@example.com' };
    mockService.getCustomerById.mockResolvedValue(customer);

    const result = await controller.getById(1);
    expect(result).toEqual(customer);
    expect(mockService.getCustomerById).toHaveBeenCalledWith(1);
  });

  test('should throw an error if customer not found', async () => {
    mockService.getCustomerById.mockResolvedValue(null);

    await expect(controller.getById(1)).rejects.toThrow('Customer not found');
  });
});
