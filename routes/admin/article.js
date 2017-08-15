/**
 * Created by mjj on 2017/8/14.
 */
let article = require('../../controllers/article');


module.exports = {

    '/': article.list,

    '/detail/:id': {
        'post': article.detail
    }
};