define('mod3', ['./lib/lib.js'], function(lib) {
    lib.log('create module 3');
    return {
        name: '我是第三个模块'
    }
})
