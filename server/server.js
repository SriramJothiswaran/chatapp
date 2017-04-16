const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const generateMessage = require('./utils/message');
const generateLocationMessage = require('./utils/generateLocationMessage');
const isRealString = require('./utils/validation');
const Users = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));

io.on('connection', function(socket){
    console.log("user connected");

    //emit from admin
    //socket.emit('newMessage',{
    //    from : 'Admin',
    //    text : 'Welcome to the Chat App',
    //    createdAt: new Date().getTime()
    //});

    //from admin to new user joined
    //socket.broadcast.emit('newMessage', {
    //   from : 'Admin',
    //    text: 'New User Joined',
    //    createdAt: new Date().getTime()
    //});


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
    socket.on('join', function(params,callback){
        if(!isRealString(params.name) || !isRealString(params.room)){
           return callback('Name and Room Name are required !');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin','Welcome to the Chat App'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', params.name +' has Joined.'));


        callback();

    });

    socket.on('createMessage', function(message,callback){
        console.log('createMessage',message);
        io.emit('newMessage', generateMessage(message.from,message.text));
        callback("");
        });

    socket.on('createLocationMessage', function(coords){
       io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });


    socket.on("disconnect", function(){
       var user = users.removeUser(socket.id);

        if(user){
            console.log(user.room);
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', user.name + " " + 'has left the room.'));

        }
    });
});


server.listen(port, function(){
    console.log('Server is up on port' + port);
});
