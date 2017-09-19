var socket = io.connect('http://localhost:9700');
socket.on('news', function(data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});

var $chatbox = $('#chatBox');
var sTmplOther = $('#others').html().trim();
var sTmplMine = $('#mine').html().trim();

function renderHtmlTmpl(sTmpl, data) {
    return sTmpl.replace('<%time%>', data.time || '')
        .replace('<%name%>', data.name || '')
        .replace('<%words%>', data.words || ' ');
}


socket.on('brandcast-msg', function(data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});