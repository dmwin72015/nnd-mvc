const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const config_path = path.resolve(__dirname, '../../config');

const config = JSON.parse(fs.readFileSync(path.join(config_path, 'mongodb.json')));

// mongoose.connect('mongodb://username:password@host:port/database?options...');
mongoose.connect(formatMongoConfig(config), config).then(() => {
    console.log('connect successed......');
}, (err) => {
    console.log('connect error......', err);
});

function formatMongoConfig(config) {
    config = config || {};

    // 默认本地 localhost
    config.host = config.host || 'localhost';

    //默认端口 27017
    config.port = config.port || '27017';

    // 默认test
    // config.database = config.database || (config.db && config.db.databaseName) || 'test';
    // 如果db里面有配置，则使用db的，默认test
    if (config.db && config.db.databaseName) {
    	return 'mongodb://' + config.host + ':' + config.port;
    }

    return 'mongodb://' + config.host + ':' + config.port + '/test';
}