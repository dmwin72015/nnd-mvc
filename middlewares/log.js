/*
    日志配置文件
*/
var fs = require('fs');
var morgan = require('morgan');
var fileStreamRotator = require('file-stream-rotator');
var path = require('path');

// 自定义的的日志格式
var formatLog = {
  'my': ':remote-addr >>>【:method - :date[dm] 】 :url | :status | :res[content-length] - | :response-time ms'
}

module.exports = function(logpath) {
  // console.log('======================log setting=============\n');
  //判断路径时候存在，不存在创建
  fs.existsSync(logpath) || fs.mkdirSync(logpath);

  // create a rotating write stream
  var accessLogStream = fileStreamRotator.getStream({
    date_format: 'YYYY-MM-DD',
    filename: path.join(logpath, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: true
  });
  // console.log('\n=================================================');
  
  return morgan(formatLog['my'], {
    stream: accessLogStream,
    // skip: function(req, res) {//过滤条件，状态吗《400
    //     return res.statusCode < 400;
    // }
  });
};