/** @format */

const express = require('express');
const router = express.Router();
const passport = require('passport');

const student = require('../../controller/StudentController/studentController');

router.post(
  '/studentRegister',
  passport.authenticate('jwt', { session: false }),
  student.studentRegister
);

router.post('/studentLogin', student.studentLogin);

module.exports = router;
