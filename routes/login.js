module.exports = {
    '/': {
        'get': function(req, res, next) {
            if (req.originalUrl == '/favicon.ico') {
                return;
            }
            res.render('login', {
                titleName: '登录页'
            });
        },

        'post': function() {


        }
    }
}