var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var moment = require('moment');
var xss = require('xss');

app.listen(9700);
require('./core/model');

let static = __dirname + "/public";


function handler(req, res) {
    fs.readFile(static + '/index.html', function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}

io.on('connection', function(socket) {
    reciveMessage(socket);

    console.log(socket.request.headers);
    // console.log(socket);
});

function reciveMessage(socket) {
    socket.on('client-msg', function(data) {
        var _send_data = {
            words: escape(data.words),
            name: socket.id,
            time: moment().format('YYYY-MM-DD HH:mm:ss')
        };
        allBrandcastMessage(_send_data);
        // bradcastMessage(socket,_send_data);
    })
}

function bradcastMessage(socket, data) {
    socket.broadcast.emit('broadcast-msg', data);
}

function allBrandcastMessage(data) {
    // io.sockets.emit('message', "this is a test");
    io.sockets.emit('all-broadcast-msg', data.words);
}

/** Used to map HTML entities to characters. */
var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;'
};

var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#96;': '`'
};
var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
    reUnescapedHtml = /[&<>"'`]/g,
    reHasEscapedHtml = RegExp(reEscapedHtml.source),
    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

function escapeHtmlChar(chr) {
    return htmlEscapes[chr];
}

function unescapeHtmlChar(chr) {
    return htmlUnescapes[chr];
}

function baseToString(value) {
    return value == null ? '' : (value + '');
}

function escape(string) {
    // Reset `lastIndex` because in IE < 9 `String#replace` does not.
    string = baseToString(string);
    return (string && reHasUnescapedHtml.test(string)) ?
        string.replace(reUnescapedHtml, escapeHtmlChar) :
        string;
}

function unescape(string) {
    string = baseToString(string);
    return (string && reHasEscapedHtml.test(string)) ?
        string.replace(reEscapedHtml, unescapeHtmlChar) :
        string;
}

// io.on('msg', function(data) {
//     Socket_obj.broadcast.emit('everyone', { msg: data.msg });
// });