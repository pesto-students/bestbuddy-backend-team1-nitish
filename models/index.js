const mongoose = require('mongoose');

const config = require('../config/db.config');

const db = {};
db.mongoose = mongoose
db.url = config.url;

db.users = require('./user.model')(mongoose);

module.exports = db;