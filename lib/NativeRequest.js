'use strict';
const querystring = require('querystring');
const http = require('http');
const https = require('https');
const _ = require('lodash');
const st = require('./status.js');
const url = require('url');

let cookie = [];
let isRedirect = 0;
/*cookie处理*/
function saveCookie() {
    //TODO:待完成
}
//解析url
function parseUrl(sUrl) {
    let _data = null;
    let oUrl = url.parse(sUrl);
    if (oUrl.hostname) {
        _data = {
            protocol: oUrl.protocol || 'http:',
            hostname: oUrl.hostname,
            path: oUrl.path,
            port: oUrl.protocol == 'https:' ? 443 : 80
        }
    }
    return _data;
}

//发送请求
function sendRequest(options, data, callback) {
    let method = options.method.toLowerCase();

    let sendData = data || {};

    if (method == 'post') {
        let postData = querystring.stringify(sendData);
        options.headers = _.extend({}, options.headers, {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Length': Buffer.byteLength(postData),
            'X-Requested-With': 'XMLHttpRequest'
        });
    } else if (method == 'get') {
        // options.path += decodeURIComponent('?' + querystring.stringify(sendData));
        if (!_.isEmpty(sendData)) {
            options.path += decodeURIComponent('?' + querystring.stringify(sendData));
        }
    }

    if (!options.path.startsWith('/')) {
        callback(st.PATH_RROR_MSG);
    }

    let httpObj = options.protocol == 'https:' ? (options.port = 443) && https : (options.port = 80) && http;

    delete options.protocol;

    console.log(options);
    console.log('参数>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log(Date.now());
    let req = httpObj.request(options, (resp) => {

        if (resp.statusCode == 200) {
            if (options.method == 'head') {
                callback(null, resp);
            } else {
                let allData = [];
                resp.on('data', function (trunk) {
                    allData.push(trunk);
                    console.log(trunk.length, Date.now());
                });
                resp.on('end', function (trunk) {
                    console.log('over', Date.now());
                    callback(null, [resp, Buffer.concat(allData)]);
                });
            }
        } else if (resp.statusCode == 301) {
            req.abort();
            if (isRedirect == 2) {
                callback(st.REDIRECT_RROR_MSG, [resp]);
                return;
            }
            isRedirect++;
            let newOptions = _.extend({}, options, parseUrl(resp.headers.location));
            sendRequest(newOptions, data, callback);

        } else {
            callback({
                status: resp.statusCode,
                msg: resp.statusMessage,
                data: resp
            });
        }
    });
    req.on('error', (err) => {
        console.log('<<<<<<ERROR>>>>>>', isRedirect);
        console.log(err);
        console.log('<<<<<<ERROR>>>>>>', isRedirect);
        st.PROGRM_RROR_MSG.data = err;

        callback(st.PROGRM_RROR_MSG);
    });
    if (method == 'post') {
        req.write(sendData);
    }
    req.end();
    // req.setTimeout(options.timeout || 2000, (err) => {
    //     callback(st.TIMEOUT_MSG);
    // });
}


function request(opt, callback) {
    opt = opt || {};
    if (typeof opt == 'string') {
        opt = {
            req: parseUrl(opt)
        };
    }

    //发送请求的参数
    let reqOpt = opt.req || {};

    if (!reqOpt.host && !reqOpt.hostname) {
        return function (callback) {
            callback(st.HOST_ERROR_MSG);
        }
    }

    let queryData = opt.data || {};

    let options = _.extend({}, st.DEFAULT_CONF, reqOpt);

    options.headers = _.extend({}, st.DEFAULT_CONF.headers, reqOpt.headers);

    if (opt.async == true) {
        sendRequest(options, queryData, callback);
        return;
    }
    return function (callback) {
        sendRequest(options, queryData, callback);
    };
}


module.exports = request;
module.exports.req_async = function (opt, callback) {
    var _options = {};
    if (typeof opt == 'string') {
        _options.req = parseUrl(opt);
    }
    var async_opt = _.extend({}, _options, {async: true});
    request(async_opt, callback);
};
module.exports.clearCookie = function () {
    cookie.length = 0;
};
module.exports.saveCookie = function (cookieArray) {

    /*
     * [ 'JSESSIONID=B2A05B3AEADF86610C52544ADC421A53; Path=/; HttpOnly',
     'atlassian.xsrf.token=BYUG-26F0-O9YG-SVK8|29fe7969b4bdb2c333d31b5a24dec9201d9162be|lin; Path=/',
     'NSC_umd.yjo.dpn=ffffffffaf18440145525d5f4f58455e445a4a423660;path=/;httponly' ]
     [ 'BAIDUID=4AFEF887098ED01FFEED925849DFAF06:FG=1; expires=Thu, 31-Dec-37 23:55:55 GMT; max-age=2147483647; path=/; domain=.baidu.com',
     'BIDUPSID=4AFEF887098ED01FFEED925849DFAF06; expires=Thu, 31-Dec-37 23:55:55 GMT; max-age=2147483647; path=/; domain=.baidu.com',
     'PSTM=1497172455; expires=Thu, 31-Dec-37 23:55:55 GMT; max-age=2147483647; path=/; domain=.baidu.com',
     'BD_LAST_QID=13485797830237286712; path=/; Max-Age=1' ],
     * */
    /*
     *   {
     *       name:{
     *           val:'',
     *           domain:'',
     *           path:'',
     *           http:true,
     *           expires:'',
     *           size:'',
     *           secure:''
     *       }
     *   }
     *
     * */
    if (Array.isArray(cookieArray) && cookieArray.length) {
        return parseCookie(cookieArray);
    }

    function parseCookie(cookie) {
        var _cookies = {};

        cookie.forEach(function (ele, index, arr) {
            let _ck = {};

            let res = ele.split(';');

            let name_val = res[0].split('=');

            _ck['val'] = name_val[1] ? name_val[1].trim() : void 0;

            for (let i = 1; i < res.length; i++) {
                let _res = res[i].split('=');
                let key = _res[0].toLowerCase().trim();
                let val = _res[1] ? _res[1].trim() : void 0;

                if (key == 'httponly') {
                    val = true;
                } else if (key == 'expires') {
                    var _od = new Date(_res[1]);
                    if (_od.toString() == "Invalid Date") {
                        val = 'Session';
                    } else {
                        val = _od;
                    }
                }
                _ck[key] = val;
            }
            _cookies[name_val[0]] = _ck;
        });
        return _cookies;
    }

    //TODO:使用正则匹配
    function parseCookie2() {
        var _cookies = {};

        cookie.forEach(function (ele, index, arr) {
            let _ck = {};

            let res = ele.split(';');

            let name_val = res[0].split('=');

            _ck['val'] = name_val[1] ? name_val[1].trim() : void 0;

            let expires = ele.match(/expires=[^;]*/i);
            _cookies[name_val[0]] = _ck;
        });
        return _cookies;


    };
};

function saveCookie(cookies) {
    for (var name in cookies) {
        cookie.push('');
    }
}

/*
 * {
 protocol: 'https:',
 slashes: true,
 auth: null,
 host: '500px.me',
 port: null,
 hostname: '500px.me',
 hash: '#dd123',
 search: '?a=123',
 query: 'a=123',
 pathname: '/community/discover',
 path: '/community/discover?a=123',
 href: 'https://500px.me/community/discover?a=123#dd123' }
 * */
module.exports.parseUrl = parseUrl;