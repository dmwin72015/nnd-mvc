var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.all('/*', function(req, res, next) {

    fs.readFile('/data_dm/webapps/demo/public/home.html', function(err, data) {
        // 读取文件失败/错误
        if (err) {
            next();
        }else{
            res.type('html').end(data)
        }
    });
    // res.render('home', { title: 'Express' });
});

module.exports = router;
