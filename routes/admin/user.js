/**
 * Created by dong on 2017/6/17.
 */
let user = require('../../controllers/user');
let userAll = function (req, res, next) {
    var action = req.params.action;

    if (req.route.methods.get) {
        if (reqGetHander[action]) {
            reqGetHander[action].apply(this, arguments)
        } else {
            next();
        }

    } else {
        if (reqPostHander[action]) {
            reqPostHander[action].apply(this, arguments)
        } else {
            next();
        }
    }
};


let reqGetHander = {
    list: function (req, res, next) {
        res.render('user/adminer.html');
    }
};

let reqPostHander = {
    add: function (req, res, next) {
        "use strict";
        userMod.insertOne(req.body, function (err, data) {
            if (err) {
                res.json(err);
            } else {
                res.json(data);
            }
        });
    },
    update:user.updateUser
};
module.exports = {
    '/:action': {
        get: userAll,
        post: userAll
    }
}