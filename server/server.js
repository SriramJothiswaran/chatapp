const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const generateMessage = require('./utils/message');
const generateLocationMessage = require('./utils/generateLocationMessage');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', function(socket){
    console.log("user connected");

    //emit from admin
    //socket.emit('newMessage',{
    //    from : 'Admin',
    //    text : 'Welcome to the Chat App',
    //    createdAt: new Date().getTime()
    //});
    socket.emit('newMessage', generateMessage('Admin','Welcome to the Chat App'));

    //from admin to new user joined
    //socket.broadcast.emit('newMessage', {
    //   from : 'Admin',
    //    text: 'New User Joined',
    //    createdAt: new Date().getTime()
    //});

    socket.broadcast.emit('newMessage', generateMessage('Admin','New User Joined'));

    //socket.on('createMessage', function(message,callback){
    //    console.log('createMessage',message);
    //    io.emit('newMessage',{
    //        from:message.from,
    //        text: message.text,
    //        createdAt: new Date().getTime()
    //    });
    //    callback('From the server');
    //
    //});
    socket.on('createMessage', function(message,callback){
        console.log('createMessage',message);
        io.emit('newMessage', generateMessage(message.from,message.text));
        callback("");
        });

    socket.on('createLocationMessage', function(coords){
       io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });


    socket.on("disconnect", function(){
       console.log("user disconnected");
    });
});


server.listen(port, function(){
    console.log('Server is up on port' + port);
});
