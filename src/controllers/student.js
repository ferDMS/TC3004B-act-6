class StudentController {
  constructor(service) {
    this.service = service;
  }

  async getAll() {
    return this.service.getAllStudents();
  }

  async getById(id) {
    const student = await this.service.getStudentById(id);
    if (!student) throw new Error('Student not found new message');
    return student;
  }
}

module.exports = StudentController;
