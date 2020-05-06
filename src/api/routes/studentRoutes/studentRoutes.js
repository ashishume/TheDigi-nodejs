/** @format */

const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const upload = multer({ dest: "uploads/students/" });
const student = require("../../controller/StudentController/studentController");

router.post(
  "/studentRegister",
  passport.authenticate("jwt", { session: false }),
  student.studentRegister
);

router.post("/studentLogin", student.studentLogin);
router.post(
  "/studentCSVUpload",
  upload.single("csvData"),
  passport.authenticate("jwt", { session: false }),
  student.studentCSVUpload
);

module.exports = router;
