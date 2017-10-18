const mongoose = require('mongoose');

require('../database/db');
require('./Room');
require('./User');

module.exports.User =  mongoose.model('User');
module.exports.Room =  mongoose.model('Room');