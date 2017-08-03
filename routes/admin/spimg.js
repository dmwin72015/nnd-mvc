"use strict";
const co = require('co');
const cheerio = require('cheerio');
const saveImg = require('../../lib/saveImg').saveImg;
const saveImg_async = require('../../lib/saveImg').saveImg_async;
const request = require('request');
const fs = require('fs');

var Cookie = {};

function randomNum(m, n) {
    return Math.floor(Math.random() * (m - n + 1) + n);
}

function saveCookie(host, target) {

}

//https://500px.me/community/discover
// 获取文章
let conf = {
    hostname: '500px.me',
    path: '/community/discover',
    // httpType: 'https',
    method: 'get',
    headers: {
        // 'Accept':'application/json, text/javascript, */*; q=0.01'
        'X-Tingyun-Id': 'Fm3hXcTiLT8;r=44021787'
    }
};

//从接口获取数据
function getDataFromAPI() {
    //https://500px.me/community/discover/rating?resourceType=0,2&category=&page=1&size=20&type=json
    let queryData = {
        'resourceType': '0,2',
        'category': '',
        'page': '1',
        'size': '20',
        'type': 'json'
    };
    let conf = {
        hostname: '500px.me',
        path: '/community/discover/rating',
        protocol: 'https:',
        method: 'get',
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'X-Tingyun-Id': 'Fm3hXcTiLT8;r=44021787'
        }
    };
    if (COOKIE && COOKIE['500px']) {
        conf.headers.Cookie = COOKIE['500px'];
    }
    return baseRequest({
        req: conf,
        data: queryData
    });
}

// 获取文章内的图片
function getImgFromHtml(sHtml) {
    var $ = cheerio.load(sHtml);
    var data = [];
    return data;
}
//解析接口内容
function parseJSONData(data) {
    var _data = JSON.parse(data);
    var arrSrc = [];

    for (var i = 0; i < _data.length; i++) {
        arrSrc.push(_data[i].url);
    }

    // return function (callback) {
    //     saveImg(arrSrc, callback);
    // }
    return function (callback) {
        saveImg_async(arrSrc, callback);
    }
}

function patchImg(req, res, next) {
    // http://img.mmjpg.com/2017/1054/1-46.jpg
    var imgsNumber = 46;
    var paths = [];
    for (var i = 1; i <= imgsNumber; i++) {
        var imgPath = '/xin/static_source/mmjpg/2017_1054_' + i + '.jpg';
        paths.push({
            id: '2017_1054_' + i,
            relPath: imgPath,
            path:'//cdn.me/mmjpg/2017_1054_' + i + '.jpg'
        });
        var writer = fs.createWriteStream('/xin/static_source/mmjpg/2017_1054_' + i + '.jpg');
        request('http://img.mmjpg.com/2017/1054/' + i + '.jpg').pipe(writer);
        writer.on('finish', ()=> {
            imgsNumber--;

            if (imgsNumber == 0) {
                res.json({
                    status: '1',
                    data: paths,
                    msg: 'success'
                })
            }
        });
    }
}


function getArtControl(req, res, next) {
    co(function *() {
        var resApi = yield getDataFromAPI();

        //保存cookie
        saveCookie('500px', resApi[0]);

        var apiData = resApi[1].toString();


        var img_res = yield parseJSONData(apiData);

        console.log(img_res);

        return img_res;

    }).then((data) => {
        res.json({
            status: 1,
            data: data,
            msg: 'success'
        });
    }).catch((e) => {
        console.log('<<<<错误>>>>', e);
        res.json(e);
    });
}

module.exports = {
    '/': function (req, res, next) {
        res.render('spider/get-img', {
            titleName: '抓取图片'
        });
    },
    '/:action': {
        post: function (req, res, next) {
            if (req.params.action == 'img') {
                patchImg.apply(this, arguments);
            } else {
                next();
            }
        }
    },
    "/imgbuf": function (req, res, next) {
        co(function *() {
            var resApi = yield getDataFromAPI();
            var apiData = resApi[1].toString();
            var img_res = yield parseJSONData(apiData);
            console.log(img_res);
            return 'aaa';
        }).then((data) => {
            res.end('ccc');
        }).catch((e) => {
            res.end('aaa');
        });
    }
};
