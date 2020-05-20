//client socket connection
$(function (){

    const socket = io();
    //obtaining DOM elements from the interface - jquery elements
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    //obtaining DOM elements from the NickNameForm - jquery elements
    const $nickForm = $('#nickForm');
    const $nickError = $('#nickError');
    const $nickName = $('#nickName');

    const $users = $('#usernames');
    
    $nickForm.submit(e => {// catch the event e
        e.preventDefault();
       socket.emit('new user', $nickName.val(), data => {
           if (data) {
               $('#nickWrap').hide();
               $('#contentWrap').show();
           } else {
               $nickError.html(`
               <div class = "alert alert-danger">
                    That username already exists.
               </div>
               `);
           }
           $nickName.val(''); //clean input text
       });   
    });
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

    socket.on('userNames', data =>{
        let html = '';
        for (let i = 0; i<data.length; i++){
            html += `<p><i class= "fas fa-user"></i> ${data[i]}</p>`
        }
        $users.html(html);
    })

});