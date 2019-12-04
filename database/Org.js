const mongoose = require('mongoose');

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
}, { _id: false });

const Org = mongoose.model('Org', orgSchema);

module.exports = Org;
