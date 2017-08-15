/**
 * Created by mjj on 2017/8/14.
 */
let User = require('../models').userMod;







/*
*  新建保存用户
*  @param {Object} data - user数据
*  @param {Function} callback  - 回调函数
* */
exports.newAndSave = function (data, callback) {
    var user = new User();

    user.uid = data.uid;
    user.uname = data.uname;
    user



};