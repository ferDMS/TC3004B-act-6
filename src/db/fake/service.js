const DBService = require('../dbService');

class FakeService extends DBService {
  constructor() {
    super();
    this.students = new Map();

    // Initialize with 5 dummy students
    const dummyStudents = [
      {
        id: '1', name: 'John Doe', email: 'john.doe@example.com', grade: 85.5, debt: 0,
      },
      {
        id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', grade: 92.0, debt: 150.0,
      },
      {
        id: '3', name: 'Bob Johnson', email: 'bob.johnson@example.com', grade: 68.5, debt: 0,
      },
      {
        id: '4', name: 'Alice Brown', email: 'alice.brown@example.com', grade: 78.3, debt: 200.0,
      },
      {
        id: '5', name: 'Charlie Wilson', email: 'charlie.wilson@example.com', grade: 59.9, debt: 350.0,
      },
    ];

    dummyStudents.forEach((student) => {
      this.students.set(student.id, student);
    });
  }

  async getAllStudents() {
    return Array.from(this.students.values());
  }

  async getStudentById(id) {
    return this.students.get(id);
  }
}

module.exports = FakeService;
