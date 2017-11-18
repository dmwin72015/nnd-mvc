var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../model').User;
var async = require('async');

const ERR_SUCCESS = {
    status: '200',
    err_msg: 'success'
}

const ERR_WRONG_PASS = {
    status: '103',
    err_msg: '账号或者密码错误'
};

const ERR_404_USER = {
    status: '104',
    err_msg: '账号不存在'
};

const ERR_AUTH_REQUIRED = {
    status: '105',
    err_msg: '请登录后操作'
}

const ERR_SESSION_DESTORY = {
    status: '106',
    err_msg: '退出登录失败'
}


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
}).post('/', async function(req, res, next) {
    var querys = req.body;
    let name = querys.name || '';
    let pass = querys.pass || '';
    let captcha = querys.captcha;
    var captcha_sessin = req.session.captcha;
    if (captcha !== captcha_sessin) {
        res.json({
            status: '102',
            err_msg: "图片验证码输入错误"
        });
        return;
    }
    var _user = await User.findOne({
        uid: name
    });
    if (_user && _user.uid === name) {
        res.json({
            status: '103',
            err_msg: "用户已经存在",
            data: null
        });
        return;
    }
    var user = new User({
        uid: name,
        uname: name,
        upwd: pass,
        alias: name,
        desc: '暂无'
    });
    user.save(function(err, doc) {
        if (err) {
            console.log(err);
            res.json({ status: 101, err_msg: err });
            return;
        }
        res.json({
            status: 200,
            err_msg: "success",
            data: doc
        });
    })
}).post('/login', async function(req, res, next) {
    let uid = req.body.name;
    let pass = req.body.pass;

    let _user = await User.findOne({
        uid: uid
    });

    if (!_user) {
        res.json(ERR_404_USER);
        return;
    }
    if (_user.uid !== uid || _user.upwd !== pass) {
        res.json(ERR_WRONG_PASS);
        return;
    }
    req.session.loginUser = _user;
    res.json(Object.assign({}, ERR_SUCCESS, { data: _user }));

}).post('/getuser', async function(req, res, next) {
    let user_id = req.session && req.session.loginUser && req.session.loginUser._id;
    if (!user_id) {
        res.json(ERR_AUTH_REQUIRED);
        return;
    }
    let name = req.body.name || '';
    let id = req.body.id || '';
    let users;
    if (name) {
        users = await User.find({ uname: new RegExp(name, 'i'), _id: { '$ne': user_id } }, 'uid uname desc friends', { 'limit': 10 }).lean().exec();
    } else {
        users = await User.find({}, 'uid uname desc friends', { 'limit': 10 }).lean().exec();
    }

    let loginUser = await User.findById(user_id).exec();
    if (users) {
        let friends = loginUser && loginUser.friends;

        for (let i = 0; i < users.length; i++) {
            if (friends && friends[users[i]._id]) {
                users[i].status = -1
            } else {
                users[i].status = 1
            }
        }
        res.json(users);
    } else {
        res.json({
            status: 500,
            err_msg: err
        })
    }
}).post('/addfriend', async function(req, res, next) {
    let loginUser = req.session && req.session.loginUser;
    let toaddId = req.body.id;

    if (!loginUser) {
        res.json(ERR_AUTH_REQUIRED);
        return;
    }
    let queryDbAction = [
        function(callback) {
            User.findById(loginUser._id, function(err, doc) {
                if (err) {
                    callback(err)
                    return;
                }
                callback(null, doc);

            })
        },
        function(callback) {
            User.findById(toaddId, function(err, doc) {
                if (err) {
                    callback(err)
                    return;
                }
                callback(null, doc);
            })
        }
    ]
    async.parallel(queryDbAction, function(err, result) {
        if (err) {
            res.json(err);
            return;
        }
        let _loginUser = result[0];
        let _toaddUSer = result[1];
        var _loginUser_friends = Object.assign({}, _loginUser.friends);
        var _toaddUSer_frineds = Object.assign({}, _toaddUSer.friends);
        _loginUser_friends[_toaddUSer._id] = {
            created: new Date(),
            name: _toaddUSer.uname,
            alias: _toaddUSer.alias,
            desc: _toaddUSer.desc
        };
        _toaddUSer_frineds[_loginUser._id] = {
            created: new Date(),
            name: _loginUser.uname,
            alias: _loginUser.alias,
            desc: _loginUser.desc
        }
        _loginUser.friends = _loginUser_friends;
        _toaddUSer.friends = _toaddUSer_frineds;

        async.parallel([function(callback) {
            _loginUser.save(callback);
        }, function(callback) {
            _toaddUSer.save(callback);
        }], function(err, result) {
            if (err) {
                result.json({ status: 106, err_msg: 'unkown', data: err })
                return;
            }
            res.json(ERR_SUCCESS)
        })
    });
}).get('/getStatus', async function(req, res, next) {
    let flag = req.session.flag;
    if (req.session.loginUser) {
        var _id = req.session.loginUser._id;
        if (flag != '1') {
            let _user = await User.findOne({
                _id: _id
            });
            req.session.loginUser = _user;
        }
        res.json(Object.assign({}, ERR_SUCCESS, { data: req.session.loginUser }));
    } else {
        res.json(ERR_AUTH_REQUIRED);
    }
}).post('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
        if (err) {
            res.json(ERR_SESSION_DESTORY);
        } else {
            res.json(ERR_SUCCESS)
        }
    })
});





module.exports = router;