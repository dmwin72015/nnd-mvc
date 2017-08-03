"use strict";
const co = require('co');
const baseRequest = require('../../lib/NativeRequest.js');
const cheerio = require('cheerio');
const request = require('request').defaults({
    jar: true
});
const fs = require('fs');
const async = require('async');
const iconv = require('iconv-lite');

const articleMod = require('../../model/articleMod');
const movieMod = require('../../model/movieMod');

let haha_conf = {
    hostname: 'www.haha.mx'
};
let ryf_conf = {
    hostname: 'www.ruanyifeng.com',
    path: '/blog/'
};

let COOKIE = {};

const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3009.0 Safari/537.36',
    'Connection': 'keep-alive',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Cookie': 'Hm_lvt_f89e0235da0841927341497d774e7b15=1500900864; Hm_lpvt_f89e0235da0841927341497d774e7b15=1500903642; _ga=GA1.2.1046011474.1498574561; _gid=GA1.2.894751301.1500900863'
};

function saveCookie(target) {
    COOKIE = baseRequest.saveCookie(target.headers['set-cookie']);
}

// 获取文章
function getArt(url) {
    // return baseRequest({
    //     req: ryf_conf
    // });
    return baseRequest(url);
}

// 获取文章内的图片
function getImgFromArt(sHtml) {
    var $ = cheerio.load(sHtml);
    var data = [];
    $('#homepage .module-list-item').each(function (i, elm) {
        var href = $(elm).find('a').attr('href');
        var title = $(elm).find('a').text();
        var time = $(elm).find('span').text();
        data.push({
            title: title,
            href: href,
            time: time
        });
    });
    return data;
}
// 获取ryf的文章信息

function getArticleInfo(sHtml) {

    var $ = cheerio.load(sHtml);
    var data = {};
    var $article = $('article.hentry');
    data.title = $article.find('#page-title').text();
    data.author = $article.find('.author').text();
    data.publishDate = new Date($article.find('.published').attr('title'));
    data.htmlContent = $article.find('.entry-content').html();
    data.textContent = $article.find('.entry-content').text();
    data.source = 'ryf';
    return data;
}

function getArtControl(req, res, next) {
    var url = req.body.url;
    if (!url) {
        res.json({
            code: '-2',
            msg: '请输入地址'
        });
        return;
    }
    if (!req.session.loginInfo) {
        res.json({
            code: '-3',
            msg: '请登录之后操作'
        });
        return;
    }

    let options = {
        url: url,
        headers: headers,
        timeout: 5000
    };
    let dataArr = [];
    request(options, (err, response, body) => {
        if (err) {
            res.json({
                code: '-3',
                data: err,
                msg: 'error'
            });
            return;
        }
        var srcData = getArticleInfo(body);
        srcData.editor = req.session.loginInfo._id;
        var article = new articleMod(srcData);
        article.save().then((doc) => {
            res.json({
                code: "1",
                data: doc,
                msg: 'success'
            })
        }).catch((err) => {
            res.json(err);
        });
    })
}

//
function testPipe(req, res, next) {
    request.get('https://avatars2.githubusercontent.com/u/17537753?v=4&u=c8eb421c0c796aab82f02e8edb2e2afcda406aba&s=400')
        .on('response', function (resp) {
            // res.json(resp);
        })
        .on('error', (err) => {
            console.log(err);
        })
        .pipe(request.put('http://node.com/admin/spart/aa?a=12', (err, resp, body) => {
            if (err) {
                res.json({
                    code: '-1',
                    msg: '保存失败'
                })
            } else {
                res.json(body);
            }
        }))
}

function saveImg(req, res, next) {
    var writer = fs.createWriteStream('/xin/memory/nnd/public_new/assets/img/logo2.png');
    req.pipe(writer);
    writer.on('finish', () => {
        res.json({
            code: 1,
            data: ['/xin/memory/nnd/public_new/assets/img/logo.png']
        })
    });
}


function parseMovieHtml(sHtml) {
    var $ = cheerio.load(sHtml);
    var $main = $('#Zoom');
    var sText = $main.text().replace(/[\r\s]*/, '');

    var sText = document.querySelector('#Zoom p:first-child').textContent.replace(/[\r\s]*/, '');
    var specialChar = '◎';
    var fieldMap = {
        '译名': 'cn_name',
        '片名': 'en_name',
        '年代': 'year',
        '产地': 'origin',
        '类别': 'category',
        '语言': 'language',
        '字幕': 'subtitle',
        '上映日期': 'release_date',
        'IMDb评分': 'IMDb_score',
        'IMDb链接': 'IMDb_link',
        '文件格式': 'file_format',
        '视频尺寸': 'resolution',
        '文件大小': 'file_size',
        '片长': 'duration',
        '导演': 'director',
        '主演': 'actors',
        '简介': 'introduction',
        '获奖情况': 'awards'
    };
    var regKeys = [];
    Object.keys(fieldMap).forEach(function (ele, index) {
        regKeys.push(specialChar + ele + '(.*?)' + specialChar);
    });
    var source = '(?:' + regKeys.join('|') + ')';
    var replaceRegexp = RegExp(source, 'ig');

    sText.replace(replaceRegexp, function (match) {
        console.log(match);
    });


    var _movie = {
        en_name: en_name && en_name[1],
        trans_name: '',
        cn_name: cn_name && cn_name[1],
        year: '',
        origin: '',
        category: '',
        language: '', //语言
        subtitle: '', //字幕
        release_date: '',
        IMDb_score: '',
        IMDb_link: '',
        douban_score: '', //豆瓣评分
        file_format: '', //文件格式
        resolution: '', //分辨率,视屏尺寸
        file_size: '', //文件大小
        duration: { //时长
            val: '',
            unit: ''
        },
        director: [], //导演
        actors: [], //演员
        introduction: '', //简介
        awards: [], //获奖情况
        poster: '', //海报
        creenshots: [''], //其他图片
        download_urls: [{
            type: '百度云',
            url: ''
        }, {
            type: '迅雷',
            url: ''
        }]
    };
    return _movie;
}


function getMovieDetail(req, res, next) {
    var url = req.body.url;
    if (!/^https?:\/\//.test(url)) {
        res.json({
            code: '-4',
            msg: 'url格式不正确'
        })
    }
    var reqData = {
        url: url,
        gzip: true
    };
    var data = [];
    request(reqData)
        .on('data', (trunk) => {
            data.push(trunk);
        })
        .on('end', () => {
            var html = iconv.decode(Buffer.concat(data), 'gb2312');
            var htmlData = parseMovieHtml(html);
            res.json({
                code: '1',
                data: htmlData,
                msg: 'success'
            })
        });
}


module.exports = {
    '/': function (req, res, next) {
        res.render('spider/get-art', {
            titleName: '抓取文章页面'
        });
    },
    '/:action': {
        post: function (req, res, next) {
            var action = req.params.action;
            switch (action) {
                case 'art':
                    getArtControl.apply(this, arguments);
                    break;
                case 'pipe':
                    testPipe.apply(this, arguments);
                    break;
                case 'movie':
                    getMovieDetail.apply(this, arguments);
                    break;
                default:
                    next();

            }
        },
        put: function () {
            saveImg.apply(this, arguments);
        }
    }
};