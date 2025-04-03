const StudentController = require('../controllers/student');

describe('StudentController', () => {
  let mockService;
  let controller;

  beforeEach(() => {
    mockService = {
      getAllStudents: jest.fn(),
      getStudentById: jest.fn(),
    };
    controller = new StudentController(mockService);
  });

  test('should get all students', async () => {
    const students = [{
      id: '1', name: 'John Doe',
    }];
    mockService.getAllStudents.mockResolvedValue(students);

    const result = await controller.getAll();
    expect(result).toEqual(students);
    expect(mockService.getAllStudents).toHaveBeenCalledTimes(1);
  });

  test('should get student by ID', async () => {
    const student = {
      id: '1', name: 'John Doe',
    };
    mockService.getStudentById.mockResolvedValue(student);

    const result = await controller.getById(1);
    expect(result).toEqual(student);
    expect(mockService.getStudentById).toHaveBeenCalledWith(1);
  });

  test('should throw an error if student not found', async () => {
    mockService.getStudentById.mockResolvedValue(null);

    await expect(controller.getById(1)).rejects.toThrow('Student not found');
  });
});
