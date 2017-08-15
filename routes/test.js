let express = require('express');
let router = express.Router();


router.get('/test', function (req, res, next) {

    console.log('cccc');

    req.params.test = '哈哈';

    next({a:12});

}, function (req, res, next) {

    console.log(req.params);

    next();
    // res.send('OK');
});


module.exports = router;