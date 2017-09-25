const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const util = require('../utils')
const config = util.readConfigFile('mongodb.json');

let uri = "mongodb://";

// 默认本地 localhost
let host = config.host || 'localhost';

//默认端口 27017
let port = config.port || '27017';

//用户
let user = config.user || '';
let pass = config.pass || '';

// 默认test
let database = config.database || 'test';

if (user && pass) {
    uri += user + ':' + pass + '@';
}
uri += host + ':' + port;
// 如果db里面有配置，则使用db的，默认test
if (!config.db || !config.db.databaseName) {
    uri += '/' + database
}
console.log(uri);
// mongoose.connect('mongodb://username:password@host:port/database?options...');
mongoose.connect(uri, config.conf)
    .then(() => {
        console.log('connect successed......');
    }, (err) => {
        console.log('connect error......', err);
    });

require('./Room');
require('./User');


module.exports.User =  mongoose.model('User');

module.exports.Room =  mongoose.model('Room');