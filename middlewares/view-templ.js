var dust = require('dustjs-linkedin');
var cons = require('consolidate');

var filters = require('./view-filter');

// 自定义的filter
for(var name in filters){
	dust.filters[name] = filters[name];
}

dust.config.whitespace = true;

// console.log('========================模板设置========================\n');
// console.log(JSON.stringify(dust.config) );
// console.log('\n======================模板设置=========================');
module.exports = cons.dust;
