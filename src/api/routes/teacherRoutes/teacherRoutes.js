/** @format */

const express = require('express');
const router = express.Router();
const passport = require('passport');

const teacher = require('../../controller/TeacherController/teacherController');

router.post('/teacherLogin', teacher.teacherLogin);

module.exports = router;
