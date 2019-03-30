var io = require('socket.io')(5000,{ origins: '*:*'});
var message  = require
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});


io.on('connection', function (socket) {
  console.log("connected")
  socket.on('msg', msg => {
    message.add(msg).then(newMsg => io.emit(newMsg))
    .catch(console.log)

  });


});