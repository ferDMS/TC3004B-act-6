class StudentController {
  constructor(service) {
    this.service = service;
  }

  static cleanForApi(student) {
    if (!student) return null;
    const {
      id, name, email, status, grade,
    } = student;
    return {
      id, name, email, status, grade,
    };
  }

  static calcStatus(grade, debt) {
    const PASSING_GRADE = 70;
    const HAS_DEBT = debt > 0;

    if (grade >= PASSING_GRADE && !HAS_DEBT) {
      return 'Approved';
    }
    if (grade < PASSING_GRADE && !HAS_DEBT) {
      return 'Pending';
    }
    if (grade >= PASSING_GRADE && HAS_DEBT) {
      return 'Restructure';
    }
    if (grade < PASSING_GRADE && HAS_DEBT) {
      return 'Expelled';
    }
    return 'Unknown';
  }

  async getAll() {
    const students = await this.service.getAllStudents();
    for (let i = 0; i < students.length; i += 1) {
      const { grade, debt } = students[i];
      students[i].status = StudentController.calcStatus(grade, debt);
      students[i] = StudentController.cleanForApi(students[i]);
    }
    return students;
  }

  async getById(id) {
    const student = await this.service.getStudentById(id);
    if (!student) throw new Error('Student not found new message');

    const { grade, debt } = student;
    student.status = StudentController.calcStatus(grade, debt);
    const cleanStudent = StudentController.cleanForApi(student);

    return cleanStudent;
  }
}

module.exports = StudentController;
