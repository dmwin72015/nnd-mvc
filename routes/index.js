const request = require('request');
const qs = require('querystring');
module.exports = {
    '/*': {
        all: function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        }
    },
    '/': function(req, res, next) {
        if (req.originalUrl == '/favicon.ico') {
            return;
        }
        if (req.session.loginInfo) {
            res.redirect('/admin/article');
        } else {
            res.render('login', { titleName: '登录页' });
        }
    },
    '/login': function(req, res, next) {


        res.render('login', { titleName: '登录页' });
    },
    '/cross': {
        'post': function(req, res, next) {
            var url = req.body.url;
            // var headers = req.boy.headers;
            var cookies = req.body.cookie;
            console.log(req.body);
            if (/^https?:\/\//.test(url)) {
                request(url, function(error, response, body) {
                    if (error) {
                        res.send({
                            err_code: response && response.statusCode,
                            err_msg: '错误',
                            data: error
                        });
                        return;
                    }
                    res.send({
                        err_code: response && response.statusCode,
                        err_msg: '',
                        data: {
                            body: body,
                            headers: response.headers
                        }
                    })
                });
            } else {
                res.json({ err_code: 101, err_msg: 'url格式错误' })
            }
        }
    }
};