var socket = io();
socket.on('connect', function(){
    console.log("connected to server");
});
socket.on('disconnect', function(){
    console.log("disconnected from server");
});

socket.on("newMessage", function(message){
   console.log('New Message', message);
    var li = $('<li></li>');
    li.text(message.from + ":" + message.text);
    $("#messages").append(li);
});





$("#message-form").submit(function(event){
    event.preventDefault();

    socket.emit('createMessage',{
       from: 'user',
        text: $('[name=message]').val()
    },function(){

    });
});