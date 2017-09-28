var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../model').User;


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
    status : '105',
    err_msg : '请登录后操作'
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
        upwd: pass
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
    let name = req.body.name || '';
    let users;
    if (name) {
        users = await User.find({ uname: new RegExp(name, 'i') }, 'uid uname desc friends', { 'limit': 10 }).lean().exec();
    } else {
        users = await User.find({}, 'uid uname desc friends', { 'limit': 10 }).lean().exec();
    }
    let loginUser = req.session && req.session.loginUser;
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
    console.log(toaddId , typeof toaddId);
    if(loginUser){
        var user = await User.findOne({_id:loginUser._id});

        console.log(user);

        user.friends = user.friends || {};
        user.friends[toaddId] = {
            created: new Date()
        };
        user.update(function(err, doc){
            console.log(err);
            res.json(doc);
        })
    }else{
        res.json(ERR_AUTH_REQUIRED);
    }
});




module.exports = router;