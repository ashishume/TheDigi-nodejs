/** @format */

const express = require('express');
const router = express.Router();
const passport = require('passport');

const teacher = require('../../controller/TeacherController/teacherController');

router.post(
  '/teacherRegister',
  passport.authenticate('jwt', { session: false }),
  teacher.teacherRegister
);

router.post('/teacherLogin', teacher.teacherLogin);

// router.post(
//   '/addStudents',
//   passport.authenticate('jwt', { session: false }),
//   teacher.addStudents
// );

router.post(
  '/addSubjects',
  passport.authenticate('jwt', { session: false }),
  teacher.addSubjects
);

router.get(
  '/teacherDetails',
  passport.authenticate('jwt', { session: false }),
  teacher.allTeachers
);

module.exports = router;
