/**
 * Created by mjj on 2017/8/14.
 */
let article = require('../../controllers/article');


module.exports = {

    '/': article.list,
    
    '/add':{
        get:article.toAdd,
        put:article.saveOne
    },

    '/detail/:id': {
        'post': article.detail
    },
};