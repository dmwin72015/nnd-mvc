/*
    路由加载器，加载所有路由
*/
"use strict";
let express = require('express');
let glob = require('glob');
let path = require('path');
let _ = require('lodash');
let router = express.Router({
    caseSensitive: true,
    strict: false
});
let currPath = __dirname;

//保存所有路由文件
let routes = [];

//请求类型
const httpType = ['GET', 'POST', 'DELETE', 'PUT', 'HEAD', 'USE', 'ALL'];
const httpType2 = ['PATCH', 'CONNECT', 'OPTIONS', 'TRACE'];
const httpDefault = 'GET';

let routeBasePath = '';

//加载路由文件
let loadFile = function(filePath, opt) {
    return glob.sync(filePath, opt);
};

//把每个文件包装成自定义路由文件
let routeFactory = function(filePath, reqPath, opt) {
    opt = opt || {};

    let ext = opt.ext || '.js';

    var fileName = path.basename(reqPath, opt.ext || '.js');

    if (fileName == 'index') {
        reqPath = path.dirname(reqPath);
    } else {
        reqPath = reqPath.replace(ext, '');
    }
    let mod = require(filePath);

    _route(reqPath, mod);

    function _route(path, mod, type) {
        if (_.isFunction(mod)) {
            addRoute(path, mod, type);
        } else if (_.isPlainObject(mod) && !_.isEmpty(mod)) {
            for (var name in mod) {
                //循环子路由
                var _reqPath = path;
                if (name != 'index' && name != '/') {
                    _reqPath = (path + '/' + name).replace(/[\/]{2,}/, '/');
                }
                if (_.isFunction(mod[name])) {
                    addRoute(_reqPath, mod[name]);
                } else {
                    for (var type in mod[name]) {
                        _route(_reqPath, mod[name][type], type);
                    }
                }
            }
        }
    }

    function addRoute(path, method, type) {
        var _t = {};
        _t['path'] = path;
        _t['method'] = method;
        _t['type'] = (type && httpType.indexOf(type.toUpperCase()) != -1) ? type.toLowerCase() : 'get';
        routes.push(_t);
        router[_t['type']](path.replace(routeBasePath,''), method);
    }
}
var initRoute = function(opt) {
    var routeFilesPath = path.join(routeBasePath, '**/*.js');
    var files = loadFile(routeFilesPath, opt);
    files.forEach(function(ele, i, arr) {
        let rFilePath = path.relative(currPath, ele);
        let reqPath = ele.replace(routeBasePath.replace(/\\/g,'/'), '');
        routeFactory(rFilePath, reqPath);
    });
    console.log('+===================路由器======================\n');
    // console.log(routes);
    console.log('\n+===================路由器======================');
};

/*
   routepath 路由的目录
*/
module.exports = function(routepath,opt) {
    routeBasePath = routepath;
    initRoute(opt);
    return router;
}
