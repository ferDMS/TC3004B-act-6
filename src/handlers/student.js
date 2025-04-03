class StudentHttpHandler {
  constructor(studentController) {
    // We use an injected controller instead of initializing one here
    // this.studentController = new StudentHttpHandler()
    this.studentController = studentController;
  }

  async getAllStudents(req, res) {
    try {
      const students = await this.studentController.getAll();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getStudentById(req, res) {
    try {
      const student = await this.studentController.getById(req.params.id);
      res.json(student);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

// Export the class directly
module.exports = StudentHttpHandler;
