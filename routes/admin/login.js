const userMod = require('../../model/userMod');

var default_callback = {
    status: '-1',
    data: [],
    message: '位置错误'
};


module.exports = {
    '/': {
        get: function(req, res, next) {
            res.render('login', {
                titleName: '首页页面'
            });
        },
        'post': function(req, res, next) {
            res.json(default_callback);
        }
    },
    'dashboard': function(req, res, next) {
        res.render('dashboard', {
            titleName: '首页页面'
        });
    },
    'check': function(req, res, next) {
        res.send('不带斜杠')
    }
}
