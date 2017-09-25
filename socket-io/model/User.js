let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

/**
 *  用户字段 User Model
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
        min: 0,
        default: 0
    },
    sex: {
        type: String,
        enum: ['1', '0', '-1'],
        default: '-1',
    },
    friends: {
        type: [{ fid: ObjectId, appendTime: { type: Date, default: Date.now } }]
    },
    created: {
        type: Date,
        default: Date.now
    }
};

let userSchema = new Schema(userField);
userSchema.static('findByLoginName', function(name, callback) {
    return this.findOne({ uid: name }, 'uid uname upwd alias sex age', callback);

});

mongoose.model('User', userSchema);