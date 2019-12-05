const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const orgSchema = new Schema({
  orgId: String,
  org_name: String,
  org_private: Boolean,
  members: {
    founders: [String],
    group_members: [String],
  },
});

const Org = mongoose.model('Org', orgSchema);

module.exports = Org;
