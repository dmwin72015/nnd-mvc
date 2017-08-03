const url = require('url');
// admin 登录状态验证
var adminAll = function(req, res, next) {
    // if (req.session && req.session.loginInfo) {
    //     req.session.loginInfo = req.session.loginInfo;
    //     next();
    //     return;
    // }
    // res.redirect('/login');
    next();
};


function dataType(method, message) {
    var data = '';
    if (method.toLowerCase() == 'get') {
        data = '所有admin下路径'
    } else {
        data = {
            status: '1',
            data: [],
            message: '所有admin下路径'
        }
    }
    return data;
}

module.exports = {
    '/': adminAll,
    '*': {
        'all': adminAll
    }
}