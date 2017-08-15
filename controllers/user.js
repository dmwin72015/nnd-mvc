/**
 * Created by mjj on 2017/8/14.
 */

let User = require('../models').userMod;

let succMsg = {
    code: '1',
    msg: 'success'
};
let ErrMsg = {
    '404': {
        status: '-101',
        msg: '用户不存在'
    },
    'pwdErr': {
        status: '-102',
        msg: '用户名或密码错误'
    },
    'loginRepeat': {
        status: '-103',
        msg: '已经登录，请勿重复登录'
    },
    'serverErr': {
        status: '-104',
        msg: '未知错误'
    },
    'capt_err': {
        status: '-105',
        msg: '图形验证码错误'
    },
    'notLogin': {
        status: '-106',
        msg: '请登录后使用此功能'
    },
    'sessionErr': {
        status: "-107",
        msg: '页面过期,请刷新页面重试'
    },
    'userExits': {
        status: '-108',
        msg: '用户已经存在'
    }
};

let regErr = {
    lostName: {
        status: '101',
        msg: '用户名不能为空'
    },
    existName: {
        status: '102',
        msg: '用户名已经被注册'
    },
    emptyPwd: {
        status: '202',
        msg: '密码不能为空'
    },
    pwdLength: {
        status: '201',
        msg: '密码长度有误'
    },
    regPwd:{
        status:'203',
        msg:'密码安全性太低'
    }

};
exports.login = function (req, res, next) {
    var uName = req.body.uname;
    var sPwd = req.body.upwd;
    if (req.session.loginInfo) {
        res.json(ErrMsg.loginRepeat);
        return;
    }

    User.findByLoginName(uName, function (err, doc) {
        if (err) {
            res.json(ErrMsg.serverErr);
            return;
        }
        if (!doc || doc.length == 0) {
            res.json(ErrMsg['404']);
            return;
        }

        if (sPwd !== doc.upwd) {
            res.json(ErrMsg.pwdErr);
            return;
        }

        var userInfo = {
            uid: doc.uid,
            uname: doc.uname,
            upwd: doc.upwd,
            age: doc.age,
            sex: doc.sex == 1 ? '男' : '女',
            alias: doc.alias,
            _id: doc._id,
            loginDate: Date.now()
        };
        req.session.loginInfo = userInfo;
        req.app.locals.loginInfo = req.session.loginInfo;
        res.json(succMsg);
    })
};

exports.register = function (req, res, next) {
    var data = req.body;
    var sess_capt = req.session.captcha;
    if (sess_capt) {
        if (sess_capt != data.captcha) {
            res.json(ErrMsg.sessionErr);
            return;
        }
    } else {
        res.json(ErrMsg.sessionErr);
        return;
    }
    if (!data.uid) {
        res.json({
            status: '-201',
            msg: '请输入账号'
        });
        return;
    }
    if (!data.pwd) {
        res.json({
            status: '-202',
            msg: '请输入密码'
        });
        return;
    }
    var user = new User();
    user.uid = data.uid;
    user.uname = data.uid;
    user.upwd = data.pwd;
    user.sex = data.sex;
    user.age = data.age || 0;
    user.save(function (err, doc) {
        if (err) {
            res.json(regErr.existName);
        } else {
            res.json(succMsg);
        }
    })
};

exports.showInfo = function (req, res, next) {
    var curUser = req.session.loginInfo;
    if (curUser) {
        userMod.findOne({_id: curUser._id})
            .lean()
            .exec(function (err, data) {
                if (err || !data) {
                    next();
                    return;
                }
                var tmpl_data = {
                    uid: data.uid,
                    name: data.uname || data.uid,
                    uname: data.uname || data.uid,
                    age: data.age || '',
                    sex: data.sex || '',
                    nick_name: data.alias || data.uid,
                    group: data.gname || '无',
                    reg_date: data.created.toLocaleString()
                };
                var re_data = {};
                var userData = {
                    uid: {title: 'ID', val: data.uid, edit: 0},
                    uname: {title: '姓名', val: data.uname || data.uid, edit: 1},
                    age: {title: '年龄', val: data.age || '', edit: 1},
                    sex: {title: '性别', val: data.sex == 1 ? "男" : "女", edit: 1},
                    nick_name: {title: '昵称', val: data.alias || data.uid, edit: 1},
                    group: {title: '组', val: data.gname || '无', edit: 0},
                    reg_date: {title: '注册时间', val: data.created.toLocaleString(), edit: 0}
                };
                re_data.userData = JSON.stringify(userData);
                res.render('user/index.html', re_data);
            });
    } else {
        res.redirect('/admin/login');
    }
};

exports.updateUser = function (req, res, next) {
    var req_data = req.body;
    User.findOneAndUpdate({uid: req_data.uid}, {
        $set: {
            uname: req_data.uname,
            age: req_data.age,
            sex: req_data.sex,
            alias: req_data.nick_name
        }
    }, {new: true}).exec((err, doc) => {
        if (err) {
            res.send({
                code: '-3',
                data: req_data,
                msg: 'error'
            });
            return;
        }
        req.app.locals.loginInfo = req.session.loginInfo = doc;
        res.send({
            code: '1',
            msg: 'success'
        });
    })
};

exports.newAndSave = function (req, res, next) {
    var _data = req.body;

};
