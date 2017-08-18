let express = require('express');
let router = express.Router();


router.get('/test', function (req, res, next) {

    console.log('cccc');

    req.params.test = '哈哈';

    next();

}, function (req, res, next) {

    console.log(req.params);

    res.render('test',req.params);
    // res.send('OK');
});


module.exports = router;