const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost/event';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

module.exports = db;
