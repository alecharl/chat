//server socket connection
const Chat = require('./models/chat');

module.exports = function (io) {
   
    let users = {};
    

    io.on('connection', async socket => {
        console.log('new user connected');
        
       let messages = await Chat.find({}).limit(6);
       socket.emit('load old msgs', messages);

        socket.on('new user', (data, cb) =>{
            console.log(data);
            
            if (data in users ||!data) {
                cb(false);
            } else {
                cb(true);
                socket.nickName = data;
                users[socket.nickName] = socket;
                updateNickNames();
            }
        });
        // emit to all sockets
        socket.on('send message', async (data, cb) => {

            var msg = data.trim();

            if(msg.substr(0,3) === '/w '){
                msg = msg.substr(3); //return substring from index 3 to end
                const index = msg.indexOf(' ');
                if(index !== -1){
                    var name = msg.substring(0, index);
                    var msg = msg.substring(index + 1);
                    if (name in users) {
                        users[name].emit('whisper', {
                            msg : msg,
                            nick : socket.nickName
                        });
                    } else {
                        cb('Error! Please enter a Valid User');
                    }
                } else {
                    cb('Error! Please enter your message');
                }
            } else {
                var newMsg = new Chat({
                    msg: msg,
                    nick: socket.nickName
                });
                await newMsg.save();

                io.sockets.emit('new message', {
                msg: data,
                nick: socket.nickName
            });
            }            
        });

        socket.on('disconnect', data => {
            if(!socket.nickName) return;
            delete users[socket.nickName];
            updateNickNames();
        });

        function updateNickNames(){
            io.sockets.emit('userNames', Object.keys(users));
        }
    });
}