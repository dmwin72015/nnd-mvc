/**
 *  用户字段
 *  uid      登陆账号 (unique max:50)
 *  uname    姓名  (max: 50)
 *  upwd     密码
 *  alias    别名
 *  sex     性别  (0 男性  1 女性  2 其他)
 *  age     年龄  (number  0 - 200)
 *  gid     组ID
 *  created 创建时间(date)
 */

let userField = {
    uid: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    uname: {
        type: String,
        required: true
    },
    alias: String,
    upwd: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        max: 150,
        min: 0
    },
    sex: {
        type: String,
        enum: ['1', '0']
    },
    _gid: {
        type: factoryModel.Schema.Types.ObjectId
    },
    created: {
        type: Date,
        default: Date.now
    }
};

// let userSchema = new Schema(userField);

// let userModel = db.model('users', userSchema);

module.exports = exports = factoryModel('users', userField);

// let ERRMSG_LOST_Login = exports.ERRMSG_LOST_Login = {
//     code: '-100',
//     msg: '请输入账号或密码'
// };
//
// let ERRMSG_EXITS_ID = exports.ERRMSG_EXITS_ID = {
//     code: '-101',
//     msg: '账号已经被注册'
// };
//
// let ERRMSG_UNVALID = exports.ERRMSG_UNVALID = function (name) {
//     return {
//         code: '-102',
//         msg: name + '格式错误'
//     }
// };
exports.LOGIN_TIP_INFO = {
    success: {
        code: '1',
        msg: '登录成功'
    },
    session_404: {
        code: '-103',
        msg: '请刷新页面重试'
    },
    id_exits: {
        code: '-102',
        msg: '用户名已经存在'
    },
    name_404: {
        code: '-101',
        msg: '账号不存在'
    },
    name_pwd_err: {
        code: '-103',
        msg: '用户名或者密码错误'
    },
    name_typeErr: {
        code: '-102',
        msg: '账号格式错误(必须为邮箱)'
    },
    pwd_err: {
        code: '-201',
        msg: '密码错误'
    },
    pwd_len_err: {
        code: '-202',
        msg: '密码长度有误'
    },
    capt_err: {
        code: '-300',
        msg: '验证码错误'
    },
    server_err: {
        code: '-400',
        msg: '未知错误'
    }
};