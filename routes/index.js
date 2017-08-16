module.exports = {
    '/': function (req, res, next) {
        if (req.originalUrl == '/favicon.ico') {
            return;
        }
        if(req.session.loginInfo){
            res.redirect('/admin/article');
        }else{
            res.render('login', {titleName: '登录页'});
        }
    },
    '/login': function (req, res, next) {
        res.render('login', {titleName: '登录页'});
    }
};
