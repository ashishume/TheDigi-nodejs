/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  subjectName: { type: String, required: true },
  isDeleted: { type: Boolean },
});

module.exports = Subject = mongoose.model('subject', SubjectSchema);
