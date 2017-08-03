/**
 * Created by dong on 2017/6/17.
 */

const userMod = require('../../model/userMod');

let userAll = function(req, res, next) {
  var action = req.params.action;

  if (req.route.methods.get) {
    if (reqGetHander[action]) {
      reqGetHander[action].apply(this, arguments)
    } else {
      next();
    }

  } else {
    if (reqPostHander[action]) {
      reqPostHander[action].apply(this, arguments)
    } else {
      next();
    }
  }
};


let reqGetHander = {
  list: function(req, res, next) {
    res.render('user/adminer.html');
  }
};

let reqPostHander = {
  add: function(req, res, next) {
    "use strict";
    userMod.insertOne(req.body, function(err, data) {
      if (err) {
        res.json(err);
      } else {
        res.json(data);
      }
    });
  },
  update: function(req, res, next) {
    var req_data = req.body;
    userMod.findOneAndUpdate({ uid: req_data.uid }, {
      $set: {
        uname: req_data.uname,
        age: req_data.age,
        sex: req_data.sex,
        alias: req_data.nick_name
      }
    }, { new: true }).exec((err, doc) => {
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
  }
};
module.exports = {
  '/': function(req, res, next) {
    var curUser = req.session.loginInfo;
    if (curUser) {
      userMod.findOne({ _id: curUser._id })
        .lean()
        .exec(function(err, data) {
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
            uid: { title: 'ID', val: data.uid, edit: 0 },
            uname: { title: '姓名', val: data.uname || data.uid, edit: 1 },
            age: { title: '年龄', val: data.age || '', edit: 1 },
            sex: { title: '性别', val: data.sex == 1 ? "男" : "女", edit: 1 },
            nick_name: { title: '昵称', val: data.alias || data.uid, edit: 1 },
            group: { title: '组', val: data.gname || '无', edit: 0 },
            reg_date: { title: '注册时间', val: data.created.toLocaleString(), edit: 0 }
          };
          re_data.userData = JSON.stringify(userData);
          res.render('user/index.html', re_data);
        });
    } else {
      res.redirect('/admin/login');
    }
  },

  '/:action': {
    get: userAll,
    post: userAll
  }
}