var dust = require('dustjs-linkedin');
var cons = require('consolidate');

// 自定义的filter
dust.filters.unicorn = function(value) {
    if (typeof value === 'string') {
        return value.replace('unicorn', 'horse');
    }
    return value;
};

dust.config.whitespace = true;

console.log('========================模板设置========================\n');
console.log(JSON.stringify(dust.config) );
console.log('\n======================模板设置=========================');
module.exports = cons.dust;
