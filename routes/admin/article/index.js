const articleMod = require('../../../model/articleMod');
const moment = require('moment');

function getArticle(req, res, next) {
  articleMod.find().lean(true).limit(10).exec(function(err, doc) {
    if (err) {
      res.json(err);
      return;
    }
    if (doc) {
      for (var i = 0; i < doc.length; i++) {
        doc[i].publishDate = moment(doc[i].publishDate).format('YYYY-MM-DD hh:mm:ss');
      }
    }
    res.render('article/list.html', {
      articles: doc
    });
  });
}

function getDetailArticle(req, res, next) {
  var action = req.params.action;
  var id = req.params.id;
  if (action == 'detail') {
    articleMod.find({ _id: id }).lean(true).exec((err, doc) => {
      if (err) {
        res.json({
          code: '-1',
          data: err,
          msg: 'error'
        });
        return;
      }
      res.json({
        code: '1',
        data: doc[0],
        msg: 'success'
      });
    });
  } else {
    res.json({
      code: '-2',
      msg: '暂未开放'
    })
  }
}


module.exports = {
  '/': getArticle,
  '/:action/:id': {
    post: getDetailArticle
  }
};