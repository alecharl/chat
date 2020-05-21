const http = require('http');
const path = require('path');//une directorios

const express = require('express');
const socketio = require('socket.io');

const mongoose = require ('mongoose');

const app = express();
const server = http.createServer(app); // el servidor recibe express
const io = socketio.listen(server); // socketio recibe un servidor

// db connection
mongoose.connect('mongodb://localhost/chat-database')
.then(db => console.log('db is connected'))
.catch(err => console.log (err));

//settings
app.set('port', process.env.PORT || 3000);
require('./sockets')(io); //importa la funcion del archivo sockets.js


app.use(express.static(path.join(__dirname,'public')));// envia la carpeta static al navegador cada vez que un usuario entra

server.listen(3000, () => {
    console.log('server on http://localhost:3000')
});