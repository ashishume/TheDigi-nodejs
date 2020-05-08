/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  userType: { type: Number },
  subjects: [],
  students: [],
  org: [],
  isDeleted: { type: Boolean, default: false },
});

module.exports = Teacher = mongoose.model('teacher', TeacherSchema);
