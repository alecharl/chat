//server socket connection
module.exports = function (io) {

   let nickNames = [];
    

    io.on('connection', socket => {
        console.log('new user connected');
        
        socket.on('new user', (data, cb) =>{
            console.log(data);
            
            if (nickNames.indexOf(data) != -1) {
                cb(false);
            } else {
                cb(true);
                socket.nickName = data;
                nickNames.push(socket.nickName);
                updateNickNames();
            }
        });

        socket.on('send message', data => {
            io.sockets.emit('new message', {// emit to all sockets
                msg: data,
                nick: socket.nickName
            }); 
        });

        socket.on('disconnect', data => {
            if(!socket.nickName) return;
            nickNames.splice(nickNames.indexOf(socket.nickName), 1); //"splice" delete elem by index
            updateNickNames();
        });

        function updateNickNames(){
            io.sockets.emit('userNames', nickNames);
        }

    });
}