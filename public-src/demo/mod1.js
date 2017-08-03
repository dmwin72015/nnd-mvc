//AMD 提前依赖（提前引用）
//CMD 就近依赖（需要时引用）
define('mod1', function() {
    function say(str) {
        console.log('mod1:' + (str || 'say something'));
    }

    function write(str) {
        console.log('mod1:' + (str || 'write something'));
    }

    return {
        say: say,
        write: write
    }
});
