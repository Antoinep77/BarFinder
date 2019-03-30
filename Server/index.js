var io = require('socket.io')(80);
var message  = require
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});


io.on('connection', function (socket) {

  socket.on('msg', msg => {
    message.add(msg).then(newMsg => io.emit(newMsg))
    .catch(console.log)

  });


});