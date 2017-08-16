/**
 * Created by mjj on 2017/8/14.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
let Mixed = Schema.Types.Mixed;


let photoField = {
    title: String,          //名称
    description: String,    //描述
    img_url: {              //图片地址
        type: [String]
    },
    comment: {              //留言
        type: [String]
    },
    author: String,          //拍摄作者
    created: {              //创建时间
        type: Mixed
    }
};