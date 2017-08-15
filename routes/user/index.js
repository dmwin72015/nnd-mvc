var User = require('../../controllers/user');

module.exports = {

    "/reg": {
        'post': User.register
    },

    "/login": {
        'post': User.login
    }

};