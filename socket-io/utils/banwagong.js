const request = require('request');
const queryString = require('querystring');

const uri = "https://api.64clouds.com/v1/getServiceInfo";
const server_conf = {
    veid: 593028,
    api_key: 'private_7sNpt464zUAuGaDTOU9cKoIU'
};

function getServerStatus(callback) {
    let url = uri + '?' + queryString.stringify(server_conf);
    return request(url, callback);
}


getServerStatus(function (err, resp, body) {
    console.log(body)
});

