const http = require('http');
const path = require('path');//une directorios

const express = require('express');
const socketio = require('socket.io');

const mongoose = require ('mongoose');

const app = express();
const server = http.createServer(app); // el servidor recibe express
const io = socketio.listen(server); // socketio recibe un servidor

// db connection
mongoose.connect('mongodb://heroku_d8nwkgz9:3gln85ji2vrsonn8v5ihmb46j0@ds041613.mlab.com:41613/heroku_d8nwkgz9')
.then(db => console.log('db is connected'))
.catch(err => console.log (err));

//settings
app.set('port', process.env.PORT || 3000);
require('./sockets')(io); //importa la funcion del archivo sockets.js


app.use(express.static(path.join(__dirname,'public')));// envia la carpeta static al navegador cada vez que un usuario entra

server.listen(process.env.PORT || 3000, () => {
    console.log('server on http://localhost:3000')
});