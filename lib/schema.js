/**
 * Created by dong on 2017/6/24.
 */

exports = module.exports = Schema;

"use strict";
const _ = require('lodash');
const EventEmitter = require('events');

const ERR_LOST_FIELD = exports.ERR_LOST_FIELD = -1;                 //缺少必须的字段
const ERR_NOT_IN_RANGE = exports.ERR_NOT_IN_RANGE =-2;              //字段验证不通过
const ERR_TYPE_FIELD = exports.ERR_TYPE_FIELD = -3;                 //类型错误
const ERR_NOT_VALID = exports.ERR_NOT_VALID = -4;                   //验证不通过，格式不正确


/*
 *   @constructor  schema 构造器 自定义个schema ，作为数据验证截使用
 *   primary     主键
 *   type        类型 ，默认：String
 *   max         最大长度(数值)
 *   min         最小长度(数值)
 *   isNull      可否为null
 *   default     默认值(自己其他属性：self:其他字段)
 *   lowercase   转小写(only type = string)
 *   uppercase   转大写(only type = string)
 * */
/*
* String
 Number
 Date
 Buffer
 Boolean
 Mixed
 Objectid
 Array

 *
* */
function Schema(options) {
    "use strict";
    this.primaryKey = [];
    this.mustKeys = [];
    this._emit = new EventEmitter();
    this.validators = [];
    this.init(options);
}

let eventErrorTypes = {
    key: ['toMany', 'lost'],
    value: ['type', 'length', 'empty'],
};

let eventHander = function (key, value, msg) {
    console.log('[' + (new Date).toLocaleString() + ']' + msg);
};

Schema.prototype.init = function (options) {
    if (!options || !_.isPlainObject(options)) {
        return this;
    }

    let _this = this;

    for (let key in options) {
        this.filter(key, options[key])
    }

    for (let eName in eventErrorTypes) {

        for (let i = 0; i < eventErrorTypes[eName].length; i++) {
            _this._emit.on(eName + ':' + eventErrorTypes[eName][i], eventHander);
        }
    }
    //todo:对schema做出验证
    this._schema = options;
    return this;
};

Schema.prototype.valid = function (data) {
    if (!data || !_.isPlainObject(data)) return;
    let _this = this;
    //TODO:暂时不处理，唯一字段
    /*for (var i = 0; i < this.primaryKey; i++) {
     if (data[key] === void 0) {
     _this._emit.emit('key:lost', key, data[key], '缺少字段');

     }
     }*/
    let validators = _this.validators;
    let _data = {};
    validators.length = 0;
    for (let i = 0; i < this.mustKeys.length; i++) {
        var key = this.mustKeys[i];
        if (data[key] === void 0) {
            validators.push({
                code: ERR_LOST_FIELD,
                field: key,
                value: data[key],
                msg: '字段[' + key + ']为必填字段'
            });
            // _this._emit.emit('key:lost', key, data[key], '缺少字段');
            return;
        }
    }

    for (let curKey in this._schema) {

        let val = data[curKey];
        let _cond = this._schema[curKey] || {};
        let valType = typeToStr(val) || 'String';

        console.log(_cond);

        if (val === void 0) {
            if (_cond.default) {

                _data[curKey] = _cond.type == 'Date' ? Date.now() : _cond.default;

                if ((_cond.type || 'String') === 'String') {
                    var otherField = _cond.default.trim().match(/self:(.*)/)[1];
                    if (data[otherField]) {
                        _data[curKey] = data[otherField] ? data[otherField] : ''
                    }
                }

            } else {

                _data[curKey] = null;
            }

        } else {
            if ((_cond.type || 'String') !== valType) {
                console.log(curKey);
                validators.push({
                    code: ERR_TYPE_FIELD,
                    field: curKey,
                    value: data[key],
                    msg: 'type error,[' + curKey + '] must be ' + _cond.type
                });
                return;
            } else {
                switch (valType) {
                    case 'Number':
                        if ((_.isNumber(_cond.min) && val < _cond.min) || (_.isNumber(_cond.max) && val > _cond.max)) {
                            validators.push({
                                code: ERR_NOT_IN_RANGE,
                                field: key,
                                value: data[key],
                                msg: 'range error,[' + key + '] length must be [' + min + '-' + max + '], current:' + val
                            });
                            return;
                        }
                        break;
                    case 'String':
                        if (_cond.trim) {
                            _data[curKey] = data[curKey].trim();
                        }
                        if (Array.isArray(_cond.length)) {
                            let min = Math.min(_cond.length[0], _cond.length[1]);
                            let max = Math.max(_cond.length[0], _cond.length[1]);

                            if (val.length < min || val.length > max) {
                                validators.push({
                                    code: ERR_NOT_IN_RANGE,
                                    field: key,
                                    value: data[key],
                                    msg: 'range error,[' + key + '] length must be [' + min + '-' + max + ']'
                                });
                                return;
                            }

                        } else if (_.isNumber(_cond.length)) {
                            if (val.length !== _cond.length) {
                                validators.push({
                                    code: ERR_NOT_IN_RANGE,
                                    field: key,
                                    value: data[key],
                                    msg: 'length error,[' + key + '] length must be [' + _cond.length + ']'
                                });
                                return;
                            }
                        } else if (_cond.enum && Array.isArray(_cond.enum)) {
                            if (_cond.enum.indexOf(val) === -1) {
                                validators.push({
                                    code: ERR_NOT_IN_RANGE,
                                    field: key,
                                    value: data[key],
                                    msg: 'range error,[' + key + '] length must be in [' + _cond.enum + ']'
                                });
                                return;
                            }
                        }
                        if (_cond.lowercase) {
                            _data[curKey] = data[curKey].toLowerCase();
                        } else if (_cond.uppercase) {
                            _data[curKey] = data[curKey].toUpperCase();
                        }
                        break;
                    case 'Date':
                        
                        break;
                }
            }
        }
    }
    return _.assign({}, data, _data);
};

Schema.prototype.primaryField = function (key) {
    this.primaryKey.push(key);
};

Schema.prototype.mustField = function (key) {
    this.mustKeys.push(key);
};


Schema.prototype.filter = function (key, option) {
    let opt = option || {};
    if (opt.primary) {
        this.primaryField(key);
    }

    if (opt.canNull === false) {
        this.mustField(key)
    }
};


function typeToStr(obj) {
    return Object.prototype.toString.call(obj || '').match(/\s(\w+)\]$/)[1] ;
}

function validMax(val, max) {
    return val <= max;
}

function validMmin(val, max) {
    return val >= max;
}