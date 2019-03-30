var io = require( 'socket.io-client');

var user = undefined;
 
const socket = io('http://localhost:5000');

function sendMessage(message){
    socket.emit('message',{message});
    socket.on('msg', data => console.log(data))
}

sendMessage("test")
