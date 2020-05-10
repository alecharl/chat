//server socket connection
module.exports = function (io) {
    io.on('connection', socket => {
        console.log('new user connected');

        socket.on('send message', function (data){
            io.sockets.emit('new message', data); // emit to all sockets
        });
    });
}