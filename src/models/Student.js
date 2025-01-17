/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  userType: { type: Number },
  subjects: [],
  teachers: [],
  isDeleted: { type: Boolean, default: false },
});

module.exports = Student = mongoose.model('student', StudentSchema);
