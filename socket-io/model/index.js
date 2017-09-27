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

// 端口
uri += host + ':' + port;

// 数据库名字
uri += '/' + database

// console.log(uri);
// mongoose.connect('mongodb://username:password@host:port/database?options...');

mongoose.Promise = global.Promise;
mongoose.connect(uri, config.conf)
    .then(() => {
        console.log( (new Date).toLocaleString() + ' >>>>> MongoDB 连接成功 <<<<<');
    }, (err) => {
        console.error((new Date).toLocaleString() + '>>>>> MongoDB 连接失败 <<<<<', err);
    });

require('./Room');
require('./User');


module.exports.User =  mongoose.model('User');

module.exports.Room =  mongoose.model('Room');