module.exports = {
    '/': function(req, res, next) {
        if(req.originalUrl == '/favicon.ico'){
            return;
        }
        res.render('login',{titleName:'登录页'});
    },
    '/login':function(req, res, next){
        res.render('login',{titleName:'登录页'});
    },
    '/test': {
        all: function(req, res, next) {
            var query = req.query;
            console.log('test...');
            next();
            // res.send('所有test下路径');
        }
    }
}
