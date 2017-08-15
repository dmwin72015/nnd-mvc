module.exports = {
    '/': function (req, res, next) {
        if (req.originalUrl == '/favicon.ico') {
            return;
        }
        res.render('login', {titleName: '登录页'});
    },
    '/login': function (req, res, next) {
        res.render('login', {titleName: '登录页'});
    }
};
