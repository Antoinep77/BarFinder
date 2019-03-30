var express = require('express')
var io = require('socket.io')(5000,{ origins: '*:*'});
var message  = require("./models/message")
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const app = express()


io.on('connection', function (socket) {
  console.log("connected")
  socket.on('msg', msg => {
    message.create(msg).then(newMsg => io.emit('msg',newMsg))
    .catch(console.log)
  });
});