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
    const $actualUser = $('#actualUser');

    const $users = $('#usernames');
    
    $nickForm.submit(e => {// catch the event e
        e.preventDefault();
       socket.emit('new user', $nickName.val(), data => {
           if (data) {
               $('#nickWrap').hide();
               $('#footer').hide();
               $('#contentWrap').show();
               $actualUser.append($nickName.val());//

           } else {
               $nickError.html(`
               <div class = "alert alert-danger">
                    That username already exists or is not Valid
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
        socket.emit('send message', $messageBox.val(), data => {
            $chat.append(`<p class ="error">${data} </p>`)
        }); // use socket to send message
        $messageBox.val('');
    });

    socket.on('new message', data => {
        $chat.append(`<p><b> ${data.nick}: </b> ${data.msg}</p>`);
        scrollToBottom();
    });

    socket.on('userNames', data =>{
        let html = '';
        for (let i = 0; i<data.length; i++){
            html += `<p><i class= "fas fa-user"></i> ${data[i]}</p>`
        }
        $users.html(html);
    })

    socket.on("whisper", data => {
        displayMsg(data, "whisper");
    })

    socket.on('load old msgs', msgs => {
        for (let i = 0; i < msgs.length; i++){
            displayMsg(msgs[i], "loaded-msgs");
        }
        scrollToBottom();
    })

    function displayMsg(data, clase){
      $chat.append(`<p class=${clase}><b> ${data.nick}: </b> ${data.msg}</p>`);

    }
    function scrollToBottom() {
        $chat.scrollTop( $chat.prop('scrollHeight'));
      }
}); 