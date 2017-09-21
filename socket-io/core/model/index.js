const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const config_path = path.resolve(__dirname, '../../config');
const file = fs.readFileSync(path.join(config_path, 'mongodb.json'));
const config = JSON.parse(file.toString());

let uri = "mongodb://";

// 默认本地 localhost
let host = config.host || 'localhost';

//默认端口 27017
let port = config.port || '27017';

//用户
let user = config._user || '';
let pass = config._pass || '';

// 默认test
let database = config.database || 'test';

if (user && pass) {
    uri += user + ':' + pass + '@';
    config.conf["auth"] = {
        "username": user,
        "password": pass,
        "authdb": database
    }
}

uri += host + ':' + port;
// 如果db里面有配置，则使用db的，默认test
if (!config.db || !config.db.databaseName) {
    uri += '/' + database
}

// mongoose.connect('mongodb://username:password@host:port/database?options...');
mongoose.connect(uri, config.conf)
    .then(() => {
        console.log('connect successed......');
    }, (err) => {
        console.log('connect error......', err);
    });