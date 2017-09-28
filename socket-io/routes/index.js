var express = require('express');
var router = express.Router();
var capt = require('../utils/captcha.js')
/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('home', { title: 'Express' });
    res.redirect('/home');
});



router.get('/home', function(req, res, next) {
	req.session.visitTime = Date.now();
    res.render('home', { title: 'Home' });
});


router.get('/img/capt.gif', function(req, res, next) {
    let captcha = capt.getCapt();
    req.session.captcha = captcha.text;
    res.set('Content-Type', 'image/svg+xml');
    res.send(captcha.data);
});




module.exports = router;