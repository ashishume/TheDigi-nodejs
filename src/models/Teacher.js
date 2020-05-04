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
  subjects: [
    {
      subId: {
        type: Schema.Types.ObjectId,
        ref: 'subject',
      },
    },
  ],
  students: [
    {
      studentId: {
        type: Schema.Types.ObjectId,
        ref: 'student',
      },
    },
  ],
  org: [
    {
      orgId: {
        type: Schema.Types.ObjectId,
        ref: 'org',
      },
    },
  ],
  isDeleted: { type: Boolean },
});

module.exports = Teacher = mongoose.model('teacher', TeacherSchema);
