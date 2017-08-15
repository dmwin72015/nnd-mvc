/**
 * Created by mjj on 2017/8/14.
 */

/*
*   需要登录权限
* */
exports.loginRequired = function (req, res, next) {
    if(!req.session.user){
        return res.render();
    }
};


/*
*   需要管理员权限
* */

exports.adminRequired = function (req, res, next) {
    if(!req.session.user){
        return res.render('',{message:'您还没有登录'});
    }

    if(!req.session.user.isAdmin){
        return res.render('',{message:'需要管理员权限'});
    }

    next();
};