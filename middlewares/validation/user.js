/**
 * Created by mjj on 2017/8/14.
 */
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
    }
};

/*
 *   user保存中间件,数据过滤
 * */
exports.saveValidtor = function (req, res, next) {
    var _data = req.body;
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
    next();
};