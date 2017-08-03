//AMD 提前依赖（提前引用）
//CMD 就近依赖（需要时引用）
var lib = require('./lib/lib.js');
define('mod2', function() {
    function mod2_say(str) {
        lib.log('mod2:' + (str || 'say something'));
    }

    function mod2_write(str) {
        lib.log('mod2:' + (str || 'write something'));
    }

    mod2_write('webpack - mod2 打包')
});
