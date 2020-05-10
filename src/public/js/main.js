//client socket connection
$(function (){

    const socket = io();
    //obtaining DOM elements fron the interface - jquery elements
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');
    
    //EVENTS
    $messageForm.submit( e=> {
        e.preventDefault(); // stop default form action
        //console.log($messageBox.val());
        socket.emit('send message', $messageBox.val()); // uses socket to send message
        $messageBox.val('');
    });

    socket.on('new message', function (data) {
        $chat.append(data + '<br/>');
    });

});