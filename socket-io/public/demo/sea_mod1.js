define(function(require, exports, module) {

    var add = function(x, y) {
        return x + y;　　　　
    };


    var str2Unicode = function(str) {
        if (!str) return null;
        var result = '';
        for (var i = 0; i < str.length; i++) {
            result += "\\u" + parseInt(data[i].charCodeAt(0), 10).toString(16);
        }
        return result;

    }　

    var unicode2Str = function(str) {
        if (!str) return null;
        var result = str.split('\\u');
        var len = 0;
        if (len = result.length) {
            for (var i = 0; i < len; i++) {

            }
        }
    }

    module.exports = {
        add: add,
        str2Unicode: str2Unicode,
        unicode2Str: unicode2Str
    }
});