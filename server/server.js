const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', function(socket){
    console.log("user connected");

    socket.emit('newEmail', {
        from :'admin@admin.com',
        text : 'hey! i m using socket',
        to : 'user@user.com',
        createdAt : new Date().getTime()
    });

    socket.emit('newMessage',{
       from: 'John',
        createdAt: '1234',
        text: "See you then"
    });

    socket.on('createMessage', function(message){
        console('message');
    });


    socket.on("disconnect", function(){
       console.log("user disconnected");
    });
});


server.listen(port, function(){
    console.log('Server is up on port' + port);
});
