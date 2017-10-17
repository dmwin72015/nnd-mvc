var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var RedisStore = require('connect-redis')(session);

var utils = require('./utils');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var redis = require('redis');


// 允许跨域
// app.use('*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:9090');
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header("Access-Control-Allow-Credentials","true"); 
//     next();
// });

// view engine setup
let artTmpl = require('express-art-template');
app.engine('html', artTmpl);
app.set('view engine', 'html');
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production',
    rules: [{
            'test': /<%(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)%>/
        },
        {
            'test': /{%([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*%}/
        }
    ]
});

// webpack 配置
const webpack = require('webpack');
const config = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// session save
// -h 66.112.217.251 -p 16379 -a redis_dm2017
const redis_config = utils.readConfigFile('redis.json');
// TODO：【DONE】经过测试连接正常，但是redis里面却没有session信息
// 经过测试是参数设置问题
// var redisClient = redis.createClient({
//     host    :  redis_config.host,
//     port    :  redis_config.port,
//     password:  redis_config.pass,
//     db      :  '3',
//     prefix  :  'dm_chat:'
// }); // replace with your config

// redisClient.on('error', function(err) {
//      console.log('Redis error: ' + err);
// }); 

// redisClient.set('test_redis',Date.now());

app.use(session({
    store: new RedisStore({
        'host': redis_config.host,
        'port': redis_config.port,
        'pass': redis_config.pass,
        'db': redis_config.db,
        'prefix': 'dm2017::',
        'logErrors': true
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        // secure: true,//https协议才会使用，
        // 人家文档有说明 Note be careful when setting this to true, 
        // as compliant clients will not send the cookie back to the server in the future if the browser does not have an HTTPS connection.
        maxAge: 1000 * 60 * 30
    },
    secret: redis_config.secret
}));

// sstatic source
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', index);
app.use('/user', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});




module.exports = app;