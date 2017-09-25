var io = require('socket.io');
var util = require('../utils');

function reciveMessage(socket) {
    socket.on('client-msg', function(data) {
        var _send_data = {
            words: util.escape(data.words),
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


function tellClientConnected(socket) {
    socket.emit('connected', {
        id: socket.id,
        message: '我是主机'
    });
    socket.on('recived', (data) => {
        console.log(data)
    })
}

function init(server) {
    io = io(server);

    io.on('connection', function(socket) {

        tellClientConnected(socket);

        reciveMessage(socket);

        console.log(socket.request.headers);
        // console.log(socket);
    });


}

module.exports = init;