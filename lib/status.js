
const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3009.0 Safari/537.36',
    'Connection': 'keep-alive',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
};

const port = '80';

// 状态吗
const REQUEST_SUCCESS = exports.REQUEST_SUCCESS = 1;                        //成功
const REQUEST_NEED_CAPTCHA = exports.REQUEST_NEED_CAPTCHA = 11;             //成功,但是需要验证码

const REQUEST_ABORT = exports.REQUEST_ABORT = -1;                           //终止
const REQUEST_NET_ERROR = exports.REQUEST_NET_ERROR = -2;                   //网络错误
const REQUEST_TIMEOUT = exports.REQUEST_TIMEOUT = -3;                       //超时
const REQUEST_ERROR_ID = exports.REQUEST_ERROR_ID = -4;                     //错误的ID
const REQUEST_HOST_ERROR = exports.REQUEST_HOST_ERROR = -5;                 //错误的HOST
const REQUEST_REDIRECT_ERROR = exports.REQUEST_REDIRECT_ERROR = -6;         //重定向失败
const REQUEST_PATH_ERROR = exports.REQUEST_PATH_ERROR = -6;                 //path错误
const REQUEST_PROGRM_ERROR = exports.REQUEST_PROGRM_ERROR = -7;             //程序报错

exports.DEFAULT_CONF = {
    headers: headers,
    port: port,
    method: 'GET'
};

exports.TIMEOUT_MSG = {
    'code': REQUEST_TIMEOUT,
    'message': '请求超时'
};

exports.HOST_ERROR_MSG = {
    'code': REQUEST_HOST_ERROR,
    'msg': '请传入正确的HOST地址'
};

exports.SUCCESS_MSG = {
    'code': REQUEST_SUCCESS,
    'msg': 'success'
};

exports.NET_ERROR_MSG = {
    'code': REQUEST_NET_ERROR,
    'msg': '网络错误'
};

exports.PROGRM_RROR_MSG = {
    'code': REQUEST_PROGRM_ERROR,
    'msg': '程序错误'
};

exports.REDIRECT_RROR_MSG = {
    'code': REQUEST_REDIRECT_ERROR,
    'msg': '重定向失败'
};

exports.PATH_RROR_MSG = {
    'code': REQUEST_PATH_ERROR,
    'msg': 'PATH错误,不符合规定'
};

// 默认返回
exports.DEFAULT_MSG = {
    status: '-1',
    msg: '未知错误'
};

