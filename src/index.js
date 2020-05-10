const http = require('http');
const path = require('path');//une directorios
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app); // el servidor recibe express
const io = socketio.listen(server); // socketio recibe un servidor

//settings
app.set('port', process.env.PORT || 3000);
require('./sockets')(io); //importa la funcion del archivo sockets.js


app.use(express.static(path.join(__dirname,'public')));// envia la carpeta static al navegador cada vez que un usuario entra

server.listen(3000, () => {
    console.log('server on http://localhost:3000')
});