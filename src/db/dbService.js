class DBService {
  constructor() {
    this.initialized = false;
  }

  async getAllStudents() {
    if (!this.initialized) {
      throw new Error('Service not initialized');
    }
    throw new Error('Method not implemented');
  }

  async getStudentById(_id) {
    if (!this.initialized) {
      throw new Error('Service not initialized');
    }
    throw new Error('Method not implemented');
  }
}

module.exports = DBService;
