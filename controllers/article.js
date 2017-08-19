/**
 * Created by mjj on 2017/8/14.
 */
let Article = require('../models').articleMod;
//新增保存
exports.newAndSave = function (articleData, callback) {
    var article = new Article();


};


//跟新
exports.update = function () {


};


//显示列表
exports.list = function (req, res, next) {
    Article.find({}, null, {limit: 20}, function (err, doc) {
        if (err) {
            res.render('article/list', {
                msg: '暂无文章'
            });
            return;
        }
        if (doc && doc.length) {
            res.render('article/list-new', {
                articles: doc
            });
        } else {
            res.render('article/list-new', {
                msg: '暂无文章'
            });
        }
    })
};

//显示详情

exports.detail = function (req, res, next) {
    var id = req.params.id;
    Article.findById(id, (err, doc)=> {
        if (err) {
            res.json(err);
        }
        res.json({
            status: '1',
            msg: 'success',
            data: doc
        });
    });
};