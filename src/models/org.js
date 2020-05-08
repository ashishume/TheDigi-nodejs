/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrgSchema = new Schema({
  name: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

module.exports = Org = mongoose.model('org', OrgSchema);
