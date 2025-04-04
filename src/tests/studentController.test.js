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
    const students = [
      {
        id: '1', name: 'Test', email: 'test@example.com', status: 'Approved', grade: 70.0,
      },
    ];
    mockService.getAllStudents.mockResolvedValue(students);

    const result = await controller.getAll();
    expect(result).toEqual(students);
    expect(mockService.getAllStudents).toHaveBeenCalledTimes(1);
  });

  test('should get student by ID', async () => {
    const student = {
      id: '1', name: 'Test', email: 'test@example.com', status: 'Approved', grade: 70.0,
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

  test('should return "Approved" status when grade is at or above 70 and no debt', () => {
    // List of testcases as defined through
    // our testing methodology
    expect(StudentController.calcStatus(70.0, 0)).toBe('Approved');
    expect(StudentController.calcStatus(100.0, 0)).toBe('Approved');
  });

  test('should return "Pending" status when grade is below 70 and no debt', () => {
    // Limit testing
    expect(StudentController.calcStatus(69.9, 0)).toBe('Pending');
    // Nominal testing
    expect(StudentController.calcStatus(50.0, 0)).toBe('Pending');
  });

  test('should return "Restructure" status when grade is at or above 70 and debt', () => {
    // Limit testing
    expect(StudentController.calcStatus(70.0, 1)).toBe('Restructure');
    // Nominal testing
    expect(StudentController.calcStatus(100.0, 100)).toBe('Restructure');
  });

  test('should return "Expelled" status when grade below 70 and debt', () => {
    // Limit testing
    expect(StudentController.calcStatus(69.9, 1)).toBe('Expelled');
    // Nominal testing
    expect(StudentController.calcStatus(50.0, 100)).toBe('Expelled');
  });
});
