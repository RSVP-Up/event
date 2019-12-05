const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const eventSchema = new Schema({
  eventId: Number,
  title: String,
  local_date_time: Date,
  orgId: String,
  series: {
    description: String,
    frequency: {
      day_of_week: String,
      interval: Number,
    },
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
