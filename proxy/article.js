/**
 * Created by mjj on 2017/8/14.
 */
var Article = require('../models').articleMod;


exports.getArticleById = function(){

    Article.findById(id);
}