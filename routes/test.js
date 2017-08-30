let express = require('express');
let router = express.Router();
const request = require('request');
const qs = require('querystring');
const md5 = require('md5');

let KEY = 's6I1LmJTmy13bD95E4sRY2xaeAkwwzQX';
let APP_KEY = '257a668d3130bec9';

router.get('/test', function (req, res, next) {
    var query = req.body;
    req.params.text = query.text;
    next();
}, function (req, res, next) {
    console.log(req.params);
    res.render('test',req.params);
    // res.send('OK');
});
router.post('/test',(req , res ,next)=>{
    var body = req.body;
    var salt = Math.random();
    var yd_data = {
        q: body.text,
        from:'zh-CHS',
        to:'EN',
        appKey:APP_KEY,
        salt:salt,
        sign:md5(APP_KEY + body.text + salt + KEY)
    };
    var url = 'https://openapi.youdao.com/api';

    var querys = qs.stringify(yd_data);

    request(url + '?' + querys , (err, resp , body)=>{
        res.json(JSON.parse(body));
    }) ;

});

module.exports = router;