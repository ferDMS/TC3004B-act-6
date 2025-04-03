const express = require('express');

const router = express.Router();
const StudentHttpHandler = require('../handlers/student');
const StudentServiceFactory = require('../db/factory');
const StudentController = require('../controllers/student');

// Create the service and controller
const studentService = StudentServiceFactory.create('fake');
const studentController = new StudentController(studentService);

// Create the handler instance
const studentHandler = new StudentHttpHandler(studentController);

// Set up routes with bound handler methods
router.get('/', studentHandler.getAllStudents.bind(studentHandler));
router.get('/:id', studentHandler.getStudentById.bind(studentHandler));

module.exports = router;
