/*
 数据库配置文件
 */
var conf = {
    dev: {
        host: 'localhost',
        port: '27017',
        db: 'spider'
    },
    pro: {
        host: 'localhost',
        port: '27017',
        db: 'spider'
    }
};
module.exports = function(env) {
    var host = conf[env].host;
    var port = conf[env].port;
    var db = conf[env].db;
    var url = 'mongodb://' + host + ':' + port + '/' + db;
    return {
        url: url,
        conf: conf[env]
    }
};
