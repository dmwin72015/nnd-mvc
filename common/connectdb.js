/**
 *    Created by mjj on 2017/6/22.
 *    connect to mongodb(连接mongodb数据库)
 */
const MongoConf = require('./mongo-config')('dev');
var options = {
    db: {native_parser: true},
    server: {poolSize: 5}
    // replset: { rs_name: 'myReplicaSetName' },
    // user: 'myUserName',
    // pass: 'myPassword'
}

const mongoose = require('mongoose');

const db = mongoose.createConnection(MongoConf.url, options);

db.on('open', ()=> {
    console.log('数据库打开====>[' + Date.now() + ']');
});


db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;


























