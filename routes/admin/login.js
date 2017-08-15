let user = require('../../controllers/user');

module.exports = {
    '/': function (req, res, next) {
        res.render('login', {
            titleName: '登录'
        });
    }
};
