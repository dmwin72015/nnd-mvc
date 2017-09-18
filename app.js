var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('./middlewares/log.js');
var routeLoader = require('./common/routeloader.js');
var app = express();

require('./models');

console.log('★★★★★★★★★★★★★★★★★★★★★★★★');
console.log('★★★★★★★★【APP start】★★★★★★★★★★');
console.log('★★★★★★★★★★★★★★★★★★★★★★★★\n');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/*****logger********/
app.use(logger(path.join(__dirname, 'logs')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

// session
app.use(session({
    secret: 'dongmin-pc',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 60 * 1000}
}))


var tmpl = require('./middlewares/viewTmpl.js');
app.engine('html', tmpl);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));

//auto route
app.use(routeLoader(path.join(__dirname, 'routes')));

/**************测试路由,正式环境舍弃*******************/
app.use(require('./routes/test'));
/*********************************/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log('---');
    var err = new Error('Not Found');
    err.status = 404;
    // res.sendStatus(404);
    res.status(404).render('40x', {
        title: err.status,
        message: '不好意思啊！！！404'
    });
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('40x', {
        title: 500,
        message: err.stack
    });
});

module.exports = app;
