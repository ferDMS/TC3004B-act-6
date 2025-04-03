const DBService = require('../dbService');

class FakeService extends DBService {
  constructor() {
    super();
    this.students = new Map();
    // Initialize with 5 dummy students
    const dummyStudents = [
      { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
      { id: '3', name: 'Bob Johnson', email: 'bob.johnson@example.com' },
      { id: '4', name: 'Alice Brown', email: 'alice.brown@example.com' },
      { id: '5', name: 'Charlie Wilson', email: 'charlie.wilson@example.com' },
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
