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

// session save
// -h 66.112.217.251 -p 16379 -a redis_dm2017
const redis_config = utils.readConfigFile('redis.json');
app.use(session({
    store: new RedisStore({
        'host': redis_config.host,
        'port': redis_config.port,
        'pass': redis_config.pass,
        'db': redis_config.db
    }),
    resave: false,
    saveUninitialized:false,
    cookie: {
        secure: true,
        maxAge: 1000 * 60 * 30
    },
    secret: redis_config.secret
}));

// view engine setup
let artTmpl = require('express-art-template');
app.engine('html', artTmpl);
app.set('view engine', 'html');
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production',
    rules:[
        {
            'test':/<%(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)%>/
        },
        {
            'test':/{%([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*%}/
        }
    ]
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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