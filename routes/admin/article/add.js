const articleMod = require('../../../model/articleMod');
const moment = require('moment');

function saveArticle(req, res, next) {
  res.render('article/add.html');
}

module.exports = {
  '/': saveArticle
}