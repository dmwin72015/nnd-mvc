/**
 * Created by mjj on 2017/6/13.
 */
const fs = require('fs');
const path = require('path');
const baseRequest = require('./NativeRequest');
const co = require('co');
const cndPath = require('./cnd-config');
const log = require('../lib/logger');

log.info('cdn', JSON.stringify(cndPath));

let real_path = cndPath.imgs;
let req_path = cndPath.cdn_imgs;

let allImgPath = [];
let allImgBuff = [];

function getImgData(src) {
    var options = baseRequest.parseUrl(src);
    return baseRequest({
        req: options
    });
}


function saveImg(src, callback) {
    co(function *() {
        "use strict";
        for (var i = 0; i < src.length; i++) {
            var res = yield getImgData(src[i]);
            downLoad(res[1]);
        }
        callback(null, allImgPath);
    });
}

function saveImg_async(allsrc, callback) {
    "use strict";
    var len = allsrc.length;
    if (len == 0) {
        callback({msg: "无数据"});
        return;
    }

    fs.existsSync(real_path) || fs.mkdirSync(real_path);

    for (var i = 0; i < allsrc.length; i++) {
        (function (ele, index) {
            baseRequest.req_async(ele.p4, function (resq, backData) {
                downLoad(ele.id, backData[1]);

                if (allImgPath.length == allsrc.length) {
                    callback(null, allImgPath);
                    // callback(null, allImgBuff);
                }
            });
        })(allsrc[i], i);
    }
}


function downLoad(id, data) {
    var name = path.join(real_path, '550px_' + id + '.jpg');
    fs.writeFileSync(name, data);
    allImgBuff.push(data);
    allImgPath.push({
        id: id,
        path: req_path + '/550px_' + id + '.jpg'
    });
}

module.exports.saveImg = saveImg;
module.exports.saveImg_async = saveImg_async;