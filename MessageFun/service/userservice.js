import io from 'socket.io-client';
 
const socket = io('http://localhost:5000');

export function joinRoom(user){
    socket.emit('join',{user})
}

export function sendMessage(message){
    socket.emit('msg',{message})
}