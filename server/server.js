const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const public_path = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server); // we can now set up new connections

app.use(express.static(public_path));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'ajidf#jdfj',
        text: 'dkfjfj',
        createdAt: 124
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage);
    });

    socket.on('disconnect', () => console.log('User was disconnected'));
});

// we are using http server instead of app.listen
server.listen(port, () => console.log(`Server is up on Port ${port}`));