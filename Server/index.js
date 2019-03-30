var io = require('socket.io')(80);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});


io.on('connection', function (socket) {
  io.emit('this', { will: 'be received by everyone'});

  socket.on('msg', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});