var io = require('socket.io');
const util = require('../utils');
const moment = require('moment');

function reciveMessage(socket) {
    socket.on('client-msg', function(data) {
        var _send_data = {
            words: util.escape(data.words),
            userID:data.user.id,
            username:data.user.name,
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
    io.sockets.emit('all-broadcast-msg', data);
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

        // console.log(socket.request.headers);
        // console.log(socket);
    });

}

module.exports = init;