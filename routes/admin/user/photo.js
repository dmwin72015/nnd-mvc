/**
 * Created by dong on 2017/6/17.
 */

var index = function (req, res, next) {
    res.render('user/my_memory.html', {
        titleName: '个人相册',
        contentClass: 'no-left'
    });

};


module.exports = {
    '/': index
}