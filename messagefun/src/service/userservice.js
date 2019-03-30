import io from 'socket.io-client';
 
const socket = io('http://localhost:5000');

export function sendMessage(message){
    socket.emit('message',{message});
}
