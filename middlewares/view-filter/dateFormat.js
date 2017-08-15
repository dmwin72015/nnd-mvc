/**
 * Created by mjj on 2017/8/14.
 */
var moment = require('moment');

module.exports = function(value) {
    var result = moment(value).format("YYYY-MM-DD HH:mm:ss");
    return result;
};
