/** @format */

const express = require('express');
const router = express.Router();
const passport = require('passport');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const admin = require('../../controller/adminControllers/adminAuthController');
const adminOrg = require('../../controller/adminControllers/org/adminOrgController');
const adminSub = require('../../controller/adminControllers/subject/adminSubController');
const adminTeacher = require('../../controller/adminControllers/teacherAdminControllers/teacherAdminController');
const adminStudent = require('../../controller/adminControllers/studentAdminControllers/studentAdminControllers');

router.post('/adminRegister', admin.adminRegister);
router.post('/adminLogin', admin.adminLogin);

router.get(
  '/org',
  passport.authenticate('jwt', { session: false }),
  adminOrg.adminOrgAccess
);

router.post(
  '/org',
  passport.authenticate('jwt', { session: false }),
  adminOrg.adminOrgCreate
);

router.get(
  '/subject',
  passport.authenticate('jwt', { session: false }),
  adminSub.adminSubAccess
);

router.post(
  '/subject',
  passport.authenticate('jwt', { session: false }),
  adminSub.adminSubCreate
);

router.post(
  '/teacherRegister',
  passport.authenticate('jwt', { session: false }),
  adminTeacher.teacherRegister
);

router.post(
  '/addStudents',
  passport.authenticate('jwt', { session: false }),
  adminTeacher.addStudents
);

router.post(
  '/addSubjects',
  passport.authenticate('jwt', { session: false }),
  adminTeacher.addSubjects
);

router.get(
  '/teacherDetails',
  passport.authenticate('jwt', { session: false }),
  adminTeacher.allTeachers
);

router.get(
  '/studentDetails',
  passport.authenticate('jwt', { session: false }),
  adminTeacher.allStudents
);

//csv upload route
router.post(
  '/teacherCSVUpload',
  upload.single('csvData'),
  passport.authenticate('jwt', { session: false }),
  adminTeacher.teacherCSVUpload
);

router.get(
  '/teacher',
  passport.authenticate('jwt', { session: false }),
  adminTeacher.teacherById
);

router.post(
  '/studentRegister',
  passport.authenticate('jwt', { session: false }),
  adminStudent.studentRegister
);

router.post(
  '/studentCSVUpload',
  upload.single('csvData'),
  passport.authenticate('jwt', { session: false }),
  adminStudent.studentCSVUpload
);

router.get(
  '/student',
  passport.authenticate('jwt', { session: false }),
  adminStudent.studentById
);

module.exports = router;
