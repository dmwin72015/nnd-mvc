var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

console.log('★★★★★★★★★★★★★★★★★★★★★★★★');
console.log('★★★★★★★★【APP start】★★★★★★★★★★');
console.log('★★★★★★★★★★★★★★★★★★★★★★★★\n');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/******logger start **************************************/
//保存到文件中
require('./core/config/log-config')(app, path.join(__dirname, 'logs'));
/******logger end *************************************/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use(session({
    secret: 'dongmin-pc',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 60 * 1000}
}))


var tmplEng = require('middlewares/view-filter/filter.js');
app.engine('html', tmplEng);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));

//我自己加的一层，来自动填充路由
var loadRoute = require('common/routeloader.js');

loadRoute(app, {
    base: path.join(__dirname, 'routes')
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.sendStatus(404);
    res.render('40x', {
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
