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
        class2type["[object " + types[i] + "]"] = name.toLowerCase();
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
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[toString.call(obj)] || "object" :
            typeof obj;
    }

    //加载JS
    function loadScript(url, callback) {
        var script = doc.createElement("script")
        script.type = "text/javascript";
        script.async = true;
        if (script.readyState) { //IE
            script.onreadystatechange = function() {
                if (script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback && callback();
                }
            };
        } else { //Others
            script.onload = function() {
                callback && callback();
            };
        }
        script.src = url;
        doc.getElementsByTagName('head')[0].appendChild(script);
    }
    //获取地址栏或者给定的url中的参数,
    function getUrlParam(name, url) {
        // var regex = new RegExp(  "[\\?&]"+name+"=([^&#]*)" );
        var vars = {};
        var parts = (url || window.location.search).replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function(m, key, value) {
                vars[key] = window.decodeURIComponent(value);
            });
        if (name && !url) {
            var ckParam = getCookieParam(name);
            return vars[name] ? (vars[name]) : (ckParam ? ckParam : null);
        }
        return vars;
    }
    //从cookie中获取参数
    function getCookieParam(name) {
        var ckey = 'XIN_' + name.toUpperCase();
        return Cookie.get(ckey) || '';
    }
    //获取相对路径的一个简单方法
    function getPath(path) {
        var div = document.createElement('div');
        div.innerHTML = '<a href=' + path + '></a>';
        var str = div.children[0].href
        div = null;
        return str;
    }

    //验证是否是https或者http开头的地址
    function isUrlLike(url) {
        return /^https?:\/\//.test(url);
    }
    //TODO:正则有问题
    function hasSearch(url) {
        return (/^https?:\/\/.*\?([^=&]+=[^=&#]+)+/).test(url);
    }
    //仅对json格式做出判断
    function isEquJson(j1, j2) {
        return JSON.stringify(j1) === JSON.stringify(j2);
    }

    var jqSrc = ('https:' == doc.location.protocol ? 'https' : 'http') + '://imgs.xin.com/xin/js/lib/jquery-1.8.1.min.js';

    function FixUrl() {
        this.filters = {};
        this.areaDom = null;
        this.$ = window.jQuery;
    }

    FixUrl.prototype = {
        constructor: FixUrl,
        init: function(names, dom) {
            var that = this;
            that.locQuery = getUrlParam() || {};
            that.regFilterParam(names);
            this.areaDom = dom || window.document;
            return;
            if (that.$) {
                _fix();
            } else {
                loadScript(jqSrc, function() {
                    _fix();
                })
            }

            function _fix() {
                window.jQuery(function() {
                    that.fix()
                })
            }
        },
        fixHref: function(href) {
            if (!isUrlLike(href)) return href; //过滤url合法性
            var that = this;
            var _res = href.split('#');
            var _res2 = _res[0].split('?');
            var sHash = _res[1] || '';
            var sSearch = _res2[1] || '';
            var sMain = _res2[0] || '';
            var tmpParam = [];
            //href中存在，则替换， 不存在则添加
            for (var key in this.filters) {
                var reg = new RegExp(key + '=([^&=]+)');
                var filterRes = that.filterParam(key);
                if (filterRes !== false) {
                    if (sSearch.match(reg)) {
                        sSearch = sSearch.replace(reg, key + "=" + filterRes);
                    } else {
                        tmpParam.push(key + '=' + filterRes);
                    }
                }
            }

            if (tmpParam.length && sSearch) {
                sMain += '?' + sSearch + '&' + tmpParam.join('&');
            } else if (sSearch) {
                sMain += '?' + sSearch
            } else if (tmpParam.length) {
                sMain += '?' + tmpParam.join('&')
            }
            var resUrl = sMain + (sHash ? '#' + sHash : '')
            return resUrl;
        },
        filterParam: function(name) {
            var filters = this.filters;
            var locQuery = getUrlParam(name);
            if (!locQuery) return false;
            if (filters[name] == 'all') {
                return locQuery;
            } else if (typeof filters[name] == 'string') {
                return filters[name] === locQuery ? locQuery : false;

            } else if (isArray(filters[name])) {
                var _tmp = filters[name].slice();
                var _res = [];
                while (_tmp.length > 0) {
                    var curFilter = _tmp.shift();
                    if (typeof curFilter == 'string') {
                        _res.push(curFilter === locQuery)
                    } else if (typeof curFilter == 'function') {
                        _res.push(curFilter.call(this, locQuery) !== false)
                    }
                }
                return _res.indexOf(true) !== -1 ? locQuery : false;
            }
            return locQuery;
        },
        jumpLoc: function(url) {

            window.location.href = this.fixHref(getPath(url) || window.location.href);
        },
        regFilterParam: function(names) {
            var that = this;
            if (isArray(names) && names.length > 0) {
                for (var i = 0; i < names.length; i++) {
                    judge.call(that, names[i]);
                }
            } else if (typeof names == 'string') {
                this.params[names] = 'all';
            }

            function judge(params) {
                if (typeof params == 'string') {
                    this.filters[params] = 'all';
                } else if (isPlainObject(params)) {
                    for (var key in params) {
                        if (typeof this.filters[key] == 'string') {
                            this.filters[key] = this.filters[key] == 'all' ? [] : [this.filters[key]];
                        } else if (isArray(this.filters[key])) {
                            this.filters[key] = [].concat(that.filters[key]);
                        } else {
                            this.filters[key] = [];
                        }
                        var curValue = params[key];
                        if (typeof curValue == 'string' || typeof curValue == 'function') {
                            this.filters[key].push(curValue);
                        } else if (isArray(curValue)) {
                            this.filters[key] = this.filters[key].concat(curValue);
                        }
                    }
                }
            }
        },
        addFilterFn: function(name, types) {
            var _tmpArr = [];
            if (isPlainObject(name) && !types) {
                for (var key in name) {
                    _add(key, name[key])
                }
            } else {
                _add(name, types)
            }

            function _add(key, value) {
                var _tmpObj = {};
                _tmpObj[key] = value
                _tmpArr.push(_tmpObj)
            }
            this.regFilterParam(_tmpArr);
            return this;
        },
        fix: function() {
            if (isEmptyObject(this.filters)) {
                return;
            }
            var oA = this.areaDom.getElementsByTagName('a'),
                len = oA.length;
            if (len <= 0) return;
            for (var i = 0; i < len; i++) {
                if (oA[i].getAttribute('nopass') != '1') {
                    oA[i].href = this.fixHref(oA[i].href);
                }
            }
        },
        getParam: function(name){
          return getUrlParam(name);
        }
    }
    window.UrlTool = new FixUrl();
})(window);
