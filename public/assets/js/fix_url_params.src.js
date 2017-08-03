(function(window) {
    'use strict';
    var doc = window.document;
    /*兼容性处理 Object.assign 用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象*/
    if (typeof Object.assign != 'function') {
        Object.assign = function(target, varArgs) { // .length of function is 2
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource != null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        };
    }
    /* 兼容性处理  Array.indexOf  判断当前数组中某个元素的位置 如不存在则返回-1*/
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(searchElement, fromIndex) {
            var k;
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = fromIndex | 0;
            if (n >= len) {
                return -1;
            }
            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            while (k < len) {
                if (k in o && o[k] === searchElement) {
                    return k;
                }
                k++;
            }
            return -1;
        };
    }
    // 兼容IE8的JSON对象
    var JSON = JSON || {};
    JSON.stringify = JSON.stringify || function(obj) {
        var t = typeof(obj);
        if (t != "object" || obj === null) {
            if (t == "string") {
                obj = '"' + obj + '"';
            }
            return String(obj);
        } else {
            var n, v, json = [],
                arr = (obj && obj.constructor == Array);
            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (t == "string") {
                    v = '"' + v + '"';
                } else if (t == "object" && v !== null) {
                    v = JSON.stringify(v)
                }
                json.push((arr ? "" : '"' + n + '":') + String(v));
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    };
    // Cookie 操作， set：设置，get：获取，clear：清除
    var Cookie = {
        set: function(e, t, o, i, s, n) {
            doc.cookie = e + "=" + (n ? t : encodeURIComponent(t)) + (s ? "; expires=" + s.toGMTString() : "") + (i ? "; path=" + i : "; path=/") + (o ? "; domain=" + o : "")
        },
        get: function(e, t) {
            var o = doc.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
            return null != o ? decodeURIComponent(o[2]) : t
        },
        clear: function(e, t, o) {
            this.get(e) && (doc.cookie = e + "=" + (t ? "; path=" + t : "; path=/") + (o ? "; domain=" + o : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT")
        }
    };
    /* 工具函数：类型判断  from Jquery 1.12*/
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var types = "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ");

    for (var i = 0; i < types.length; i++) {
        class2type["[object " + types[i] + "]"] = types[i].toLowerCase();
    }

    var isArray = Array.isArray || function isArray(obj) {
        return getType(obj) === "array";
    };

    function isPlainObject(obj) {
        var key;
        if (!obj || getType(obj) !== "object" || obj.nodeType) {
            return false;
        }
        try {
            if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        } catch (e) {
            return false;
        }
        for (key in obj) {}
        return key === undefined || hasOwn.call(obj, key);
    }

    function isEmptyObject(obj) {
        var name;
        for (name in obj) {
            return false;
        }
        return true;
    }

    function getType(obj) {
        if (obj == null) {
            return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
    }
    //加载JS
    function loadScript(url, callback) {
        var script = doc.createElement("script")
        script.type = "text/javascript";
        script.async = true;
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
                callback && callback();
            }
        };
        script.src = url;
        doc.getElementsByTagName('head')[0].appendChild(script);
    }
    // 调用jQuery zepto -> $()
    function ready(src, callback) {
        if (!callback) {
            callback = src;
            src = jqSrc;
        }
        if (window.$ && typeof window.$ == 'function') {
            window.$(callback);
        } else {
            loadScript(src, function() {
                window.$(callback);
            });
        }
    };
    //获取地址栏或者给定的url中的参数,
    function getUrlParam(url) {
        var vars = {};
        var parts = (url || window.location.search).replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function(m, key, value) {
                vars[key] = window.decodeURIComponent(value);
            });
        return vars;
    }

    //获取相对路径的一个简单方法
    function getPath(path) {
        var div = document.createElement('div');
        div.innerHTML = '<a href=' + path + '></a>';
        var str = div.children[0].href
        div = null;
        return str;
    }
    //仅对json格式做出判断
    function isEquJson(j1, j2) {
        return JSON.stringify(j1) === JSON.stringify(j2);
    }
    //过滤## ，JavaScript，tel 等
    function isUrlLike(url) {
        return !/^#|javascript|tel|mailto/i.test(url)
    }

    //修改href的参数
    function fixHref(href, filters) {
        if (!isUrlLike(href) || !isPlainObject(filters)) return href; //过滤url合法性
        var _res = href.split('#');
        var _res2 = _res[0].split('?');
        var sHash = _res[1] || '';
        var sSearch = _res2[1] || '';
        var sMain = _res2[0] || '';
        var tmpParam = [];
        var filters = Object.assign({}, filters || {});
        //href中存在，则替换， 不存在则添加,
        for (var key in filters) {
            var reg = new RegExp("(^|&|\\?)"+ key +"=([^&]*)(&|$)");
            if (sSearch.match(reg)) {
                if(''+filters[key]){
                    sSearch = sSearch.replace(reg, '$1'+key + "=" + filters[key]+'$3');
                }else{
                    sSearch = sSearch.replace(reg, '$1');
                }
            } else {
                tmpParam.push(key + '=' + filters[key]);
            }
        }

        if (tmpParam.length && sSearch) {
            sMain += '?' + sSearch + '&' + tmpParam.join('&');
        } else if (sSearch) {
            sMain += '?' + sSearch
        } else if (tmpParam.length) {
            sMain += '?' + tmpParam.join('&')
        }
        var resUrl = sMain + (sHash ? '#' + sHash : '');
        return resUrl;
    }
    var jqSrc = ('https:' == doc.location.protocol ? 'https' : 'http') + '://imgs.xin.com/xin/js/lib/jquery-1.8.1.min.js';

    function FixUrl() {
        this.params = [];
        this.filters = {};
        this.locQuery = {};
    }
    FixUrl.prototype = {
        constructor: FixUrl,
        init: function(names) { //初始化的时候，只判断扩展参数。不考虑范围。
            var that = this,
                params = that.params;

            if (typeof names == 'string') {
              _addParam(names)

            } else if (isArray(names)) {
                for (var i = 0; i < names.length; i++) {
                    _addParam(names[i])
                }
            }
            var _tmp = getUrlParam() || {};
            for (var name in _tmp) {
                if (that.params.indexOf(name) != -1 && _tmp[name] != void 0) {
                    that.locQuery[name] = _tmp[name];
                }
            }
            function _addParam(name){
                params.indexOf(name) === -1 ? params.push(name) : null;
                that.filters[name] = null;
            }
        },
        _fixHref: function(href) {
            var filters = this.filters;
            var newparams = {};
            for (var name in filters) {
                var tmpVal = this.filterParam(name, href);
                if (tmpVal !== false) {
                    newparams[name] = tmpVal
                }
            }
            return fixHref(href, newparams);
        },
        filterParam: function(name, href) {
            var params = this.filters;
            var qVal = getUrlParam()[name] || getCookieParam(name); //考虑cookie
            if (!qVal) return false;
            if (isArray(params[name])) {
                return params[name].indexOf(qVal) === -1 ? false : qVal;
            } else if (typeof params[name] == 'function') {
                var _res = params[name](qVal, href);
                return _res == void 0 ? qVal : _res; //当前地址栏中的参数，需要修改的url
            }
            //从cookie中获取参数
            function getCookieParam(name) {
                var ckey = 'XIN_' + name.toUpperCase();
                return Cookie.get(ckey) || '';
            }
            return qVal;
        },
        regFilter: function(name, params) {
            var that = this,
                curParams = that.params,
                filters = that.filters;
            if (curParams.indexOf(name) !== -1) {
                if (typeof params == 'string') {
                    filters[name] = [params];
                } else if (isArray(params)) {
                    filters[name] = [].concat.call(filters[name] || [], params);
                } else if (typeof params == 'function') {
                    filters[name] = params;
                }
            }
        },
        filter: function(name, values) {
            var _tmpArr = [];
            if (isPlainObject(name) && !values) {
                for (var key in name) {
                    this.regFilter(key, name[key]);
                }
            } else {
                this.regFilter(name, types);
            }
            this.fix();
            return this;
        },
        clear: function(name) {
            this.init(name || this.params);
        },
        fix: function(dom) {
            var that = this;
            var start = Date.now();
            ready(function() {
                var oA = (dom || doc).getElementsByTagName('a'),
                    len = oA.length;
                if (len <= 0) return;
                oA = Array.prototype.slice.call(oA);
                for (var i = 0; i < len; i++) {
                    var oldHref = oA[i].getAttribute('href');
                    if(!oldHref || !isUrlLike(oldHref)){
                        continue;
                    }
                    if (oA[i].getAttribute('nopass') != '1') {
                        oA[i].setAttribute('href', that._fixHref(oldHref));
                    }
                }
            });
        }
    };
    var _fx = new FixUrl();
    var UrlTool = {
        getUrlParam: function(data) {
            var querys = getUrlParam();
            if (typeof data == 'string') {
                return querys[data] || '';
            } else if (isPlainObject(data)) {
                return Object.assign({}, querys, data);
            }
            return querys;
        },
        loadScript: loadScript,
        fixHref: function(href, filters, flag) {
            if (flag !== false) {
                filters = Object.assign(_fx.locQuery, filters || {})
            }
            return fixHref(href, Object.assign(filters || _fx.locQuery, getUrlParam(href)));
        },
        init: function(names) {
            _fx.init(names);
        },
        filter: function(name, values) {
            _fx.filter(name, values);
        },
        fix: function(dom) {
            _fx.fix(dom);
        },
        $ready: ready
    };
    window.UrlTool = UrlTool;
    window.Cookie = Cookie;
})(window);

// 初始化
UrlTool.init(['from', 'channel', 'abtest', 'case', 'lpopt', 'platform', 'appver','source_type']);
// 对参数设置过滤条件， 用于指定参数的值的范围，范围可以是：字符串、数组、函数（方法）都可以。

// 如果过滤条件是一个方法或者函数的话，
//    会传入两个参数： value 当前地址栏中的参数值， href： 需要进行参数修正的A标签的链接。
//    如果不满足过滤条件，一定要返回false， 将对此参数忽略，不进行传递
//    如果没有显式返回一个值（js的函数默认会返回一个undefined），否则使用地址栏中的参数的值
//    如果有返回值，使用返回的值作为参数的值，

// 透传参数检验
UrlTool.filter({
    //'from': ['app', 'dbm', 'uegou', 'sjd', 'cjb'], // 内部渠道
    'channel': function(value, href) { // 外部渠道
        if (value && /^[\-\w]+$/.test(value)) {
            return value;
        }
        return false;
    },
    'abtest': function(value, href) { // abtest
        var _v = value.toUpperCase();
        if (_v != 'A' && _v != 'B') {
            return false;
        }
        return _v;
    },
    'case': function(value, href) { // sem落地页 - 页面分类参数
        if (value && /^[\w]+$/.test(value)) {
            return value;
        }
        return false;
    },
    'lpopt': function(value, href) { // sem落地页 - 强制参数
        if (value && /^[\w]+$/.test(value)) {
            return value;
        }
    }
});

// 文件加载完成之后执行,如果有jquery，则使用$() , 如果没有，则在引入jquery之后，执行$();
//UrlTool.$ready(function() {
//    console.log('ready');
//});
/*
本次改进内容：
1. href合法性验证的考虑情况,
    （1）href为特殊情况：#，javascript，tel，mailto等等开头
    （2）href为空字符串
    （3）没有href属性
2.getUrlParam(data)
    data ，字符串 ，json格式
    如果没有传递参数，    返回当前地址栏的参数的JSON对象
    如果data为string    怎么返回地址栏的参数的值，如果参数不存在，返回空字符串 ''.
    如果为JSON格式对象，  则与地址栏的参数的JSON对象合并
    例如：地址栏中有参数  channel=123&case=ceshi

     UrlTool.getUrlParam({channel:456});  => {case : 'ceshi', channel:'456' }
     UrlTool.getUrlParam('channel');      => 123
     UrlTool.getUrlParam();               => {channel:'123', case: 'ceshi'}
     UrlTool.getUrlParam('from');         => ''

3.fixHref(url , params, flag)
    fixHref进行改进，则会覆盖地址栏中的同名参数，添加新的参数。
    增加一个参数flag，用来判断是否是需要与地址栏中参数合并，
    默认为true，
    如果为false，则只是用传入的参数，而不去取地址栏中的参数
    例如：
        假设地址栏中已经有参数 channel=12&from=wap
        fixHref('http://www.xin.com/',{case:'dd'}) =>http://www.xin.com/?case=dd&channel=12&from=wap
        fixHref('http://www.xin.com/',{case:'dd'},false) =>http://www.xin.com/?case=dd
        如果你不想使用url中参数，则可以这样
        fixHref('http://www.xin.com/',{},false)  =>http://www.xin.com/
*/
