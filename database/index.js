const mongoose = require('mongoose');

const mongoUri = 'mongodb://database/event';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

module.exports = db;
