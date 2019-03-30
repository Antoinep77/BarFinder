var express = require('express')
var io = require('socket.io')(5000,{ origins: '*:*'});
var messages  = require("./models/message")
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const app = express()

app.get('/messages', (req,res,next) =>{
  messages.find().then(msgList => res.json(msgList))
    .catch(console.log)
})


io.on('connection', function (socket) {
  console.log("connected")
  socket.on('msg', msg => {
    messages.create(msg).then(newMsg => io.emit('msg',newMsg))
    .catch(console.log)
  });
});

app.listen(4000, function () {
  console.log('Example app listening on port 3000!')
})