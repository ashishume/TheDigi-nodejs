/** @format */

const express = require('express');
const router = express.Router();
const passport = require('passport');

// const student = require('../../controller/TeacherController');

router.post(
  '/studentRegister',
  passport.authenticate('jwt', { session: false }),
  teacher.teacherRegister
);

router.post('/studentLogin', teacher.teacherLogin);

module.exports = router;
