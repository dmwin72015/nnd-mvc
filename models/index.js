/**
 * Created by mjj on 2017/8/3.
 */

let mongoose = require('mongoose');

let db_url = require('../config/mongod.conf')('dev');

let options = {
    // user: 'dong01',
    // pass: 'dong_2017',
    server: {
        poolSize: 20
    }
};

console.log(db_url);

mongoose.connect(db_url, options);

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    // we're connected!
    console.log('连接OK');
});

 
require('./article');
require('./movie');
require('./user');

exports.userMod = mongoose.model('User');
exports.articleMod = mongoose.model('Article');
exports.movieMod = mongoose.model('Movie');