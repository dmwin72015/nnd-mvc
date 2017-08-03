const userMod = require('../../model/userMod');
const msg = userMod.LOGIN_TIP_INFO;

let actions = {
  regi: function(req, res, next) {
    var data = req.body;
    var sess_capt = req.session.captcha;
    if (sess_capt) {
      if (sess_capt != data.captcha) {
        res.json(capt_err);
        return;
      }
    } else {
      res.json(STATUS.session_404);
      return;
    }
    var _data = {
      uid: data.name,
      uname: data.name,
      upwd: data.pwd,
      created: new Date()
    };
    userMod.insertOne(_data, function(err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  },
  del: function() {

  },
  login: function(req, res, next) {
    var uName = req.body.uname;
    var sPwd = req.body.upwd;
    if (req.session.loginInfo) {
      res.json({
        code: -6,
        msg: '已经登录，请勿重复登录'
      });
      return;
    }
    userMod.findOne({ uid: uName }, 'uid uname upwd alias sex age', function(err, doc) {
      if (err) {
        res.json(msg.server_err);
        return;
      }
      if (!doc) {
        res.json(msg.name_404);
        return;
      }
      if (sPwd !== doc.upwd) {
        res.json(msg.name_pwd_err);
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
      res.json(msg.success);
    });
  }
};

module.exports = {
  '/:id': {
    'post': function(req, res, next) {
      actions[req.params.id] ? actions[req.params.id].apply(this, arguments) : next();
    }
  }
};