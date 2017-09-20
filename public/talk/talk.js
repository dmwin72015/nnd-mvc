var socket = io.connect('http://localhost:9700')
socket.on('news', function(data) {
    console.log(data)
    socket.emit('my other event', { my: 'data' })
})

var $chatbox = $('#chatBox')
var sTmplOther = $('#others').html().trim()
var sTmplMine = $('#mine').html().trim()

$('.dm-btn.send').click(function() {
    sendMessage($('#sendText')[0].value);

    $('#sendText').val('')
});
$('#sendText').on('keydown', function(ev) {
    if (ev.keyCode == 13) {
        sendMessage(this.value);
        $('#sendText').val('');
        return false;
    }
})

function sendMessage(text) {
    socket.emit('client-msg', { text: text || 'kongkongkn' })
}


function renderHtmlTmpl(sTmpl, data) {
    return sTmpl.replace('<%time%>', data.time || '').
    replace('<%name%>', data.name || '').
    replace('<%words%>', data.words || ' ')
}

socket.on('broadcast-msg', function(data) {
    console.log(data)

})

socket.on('client-connet', function(data) {

    console.log(data)
    saveUserInfo(data)
});

socket.on('broadcast-msg', function(data) {

    console.log('来自广播消息:', data)

})


function saveUserInfo(data) {
    localStorageSave('current_user', JSON.stringify(data))
}

function localStorageSave(name, values) {
    var storage = window.localStorage
    if (storage) {
        storage.setItem(name, values)
    }
}

function localStorageGet(name) {
    var storage = window.localStorage
    if (storage) {
        return storage.getItem(name)
    }
    return null
}