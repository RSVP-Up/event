const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost/event';

mongoose.connect(mongoUri);

const db = mongoose.connection;

module.exports = db;
