const req = require('reqwest');

function proxyHanlder() {


}


export let searchUser = function(username, callback) {

    if (!callback) {
        return new Promise(function(resolve, reject) {
            if (!username) {
                reject({ status: 101, err_msg: '请输入用户名' })
            } else {
                doRequest((err, resp) => {
                    err ? reject(err) : resolve(resp);
                });
            }
        });
    }

    doRequest(callback);

    function doRequest(callback) {
        req({
            url: '/user/getuser',
            method: 'post',
            data: { name: username },
            success: function(resp) {
                callback(null, resp);
            },
            error: function(err) {
                callback(err);
            }
        })
    }
}

export let add_frined = function(id) {

    console.log(id);
}


export let logout = function(callback) {
    if (!callback) {
        return new Promise(function(resolve, reject) {
            doRequest((err, resp) => {
                err ? reject(err) : resolve(resp);
            });
        });
    }
    doRequest(callback);
    function doRequest(callback) {
        req({
            url: '/user/logout',
            method: 'post',
            success: function(resp) {
                callback(null, resp);
            },
            error: function(err) {
                callback(err);
            }
        })
    }
}