/** @format */

const express = require('express');
const router = express.Router();
const student = require('../../controller/StudentController/studentController');

router.post('/studentLogin', student.studentLogin);

module.exports = router;
