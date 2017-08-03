const co = require('co');
const cheerio = require('cheerio');
const st = require('../../lib/status.js');
const baseRequest = require('../../lib/NativeRequest.js');


var default_option = {
    hostname: 'tlc.xin.com'
};


var loginStatus = {};

function captchaImg() {
    return "";
}

//保存登录状态
function saveUserInfo(userdata, cbData, cookie) {
    loginStatus = {
        loginTime: new Date().toLocaleString(),
        name: userdata.jiraName,
        email: userdata.jiraName,
        pwd: userdata.jiraPwd,
        cbInfo: cbData
    };
}

//简单判断登录时长,如果大于 {时间} 则判断为cookie失效
function checkStatus() {
    var interval = Date.now() - loginStatus.loginTime;
    if (interval / (1000 * 60 )) {

    }
}
/*
 获取后台设置的cookie
 @opt {Object} opt - 配置信息
 */
function headerCookie(opt) {
    var getOpt = {
        hostname: 'tlc' + '.' + 'xin' + '.' + 'com',
        path: '/secure/Dashboard.jspa',
        method: 'HEAD'
    };
    return baseRequest({
        req: getOpt
    });
}

/*
 登录到jira
 @param {Object} opt - post的配置信息
 */
function loginJira(data) {
    data = data || {};
    var loginData = {
        'os_username': data.jiraName || '',
        'os_password': data.jiraPwd || '',
        'os_captcha': ''
    };
    var opt = {
        hostname: '',
        path: '/rest/gadget/1.0/login',
        method: 'POST'
    };
    return baseRequest({
        req: opt,
        data: loginData
    });
}


/**
 获取jira信息
 @param    {string} id - jira的id
 */
function getJiraData(id) {
    var getOpt = {
        path: 'browse/NCSERVER-' + id,
        method: 'GET'
    };

    var cookie = loginStatus.Cookie;

    if (cookie) {
        var str = '';
        for (var name in cookie) {
            str += name + ':' + cookie[name];
        }
        opt.headers.Cookie = str;
    }

    return baseRequest({
        req: getOpt
    });
}
//总的
function allController(req, res, next) {
    var type = req.body.type;
    switch (type) {
        case 'login':
            loginControl.apply(this, arguments);
            break;
        case 'quit':
            quitControl.apply(this, arguments);
            break;
        case 'jira':
            getJiraControl.apply(this, arguments);
            break;
        default:
            next();
    }
}

/*
 login操作处理
 */
function loginControl(req, res, next) {
    co(function*() {
        return yield loginJira(req.body);
    }).then((cbinfo) => {
        var resp = cbinfo[0];
        var cbStatus = JSON.parse(cbinfo[1] || null);
        if (!cbStatus) {
            res.json({
                'status': st.REQUEST_NET_ERROR,
                'data': null,
                'msg': '网络错误'
            });
            return;
        }
        if (cbStatus) {
            if (cbStatus.loginSucceeded) {
                // saveCookie(resp.headers['set-cookie']);
                saveUserInfo(req.body, cbStatus, resp);
                req.app.locals.loginStatus = {
                    name: req.body.jiraName,
                    email: req.body.jiraName + '@xin.com'
                };
                res.json(st.SUCCESS_MSG);
                return;
            }
            if (cbStatus.isElevatedSecurityCheckShown) { //有验证码了
                res.json({
                    'status': st.REQUEST_NEED_CAPTCHA,
                    'data': {time: Date.now(), captcha: captchaImg()},
                    'msg': '登录失败，需要图片验证码'
                });
                return;
            }
        }
        next();
    }).catch((err) => {
        console.log('error---->', err);
        res.send(err);
    });
}

/*
 退出操作
 */
function quitControl(req, res, next) {
    req.app.locals.loginStatus = null;
    res.json({
        status: '1',
        data: [],
        msg: '退出成功'
    });
}

/*
 获取jira内容
 * */
function getJiraControl(req, res, next) {
    var id = req.body.id;
    if (!id) {
        res.json({
            status: st.REQUEST_ERROR_ID,
            data: null,
            msg: '错误的ID'
        });
        return;
    }

    co(function*() {
        var cbinfo = yield getJiraData(id);
        return cbinfo;
    }).then((data) => {
        res.json({
            status: st.REQUEST_SUCCESS,
            data: data[1],
            msg: 'success'
        })
    }).catch((err) => {
        res.json(err);
    });
}

module.exports = {
    '/': function (req, res, next) {
        // console.log(req.app.locals);
        res.render('spider/get', {
            titleName: '抓取页面'
        });
    },
    '/jira': {
        post: allController
    },
    '/:action': {
        post: function (req, res, next) {
            if (req.params.action == 'tlc') {
                getStatus.apply(this, arguments);
            } else {
                next();
            }
        }
    }
};
