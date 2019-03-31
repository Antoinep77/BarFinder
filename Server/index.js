var express = require('express')
var io = require('socket.io')(5000,{ origins: '*:*'});
var messages  = require("./models/message")
var missions = require("./models/mission")
var mongoose = require('mongoose');
var checkWords = require('./missions/checkWord');

var messageRouter = require('./routes/messages');
var missionRouter = require('./routes/missions');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/messages',messageRouter)
app.use('/missions', missionRouter)

app.listen(4000, function () {
  console.log('Example app listening on port 3000!')
})


io.on('connection', function (socket) {
  console.log("connected")

  socket.on('join', member =>{
    missions.findOne({current:true,username: member.username}).then(mission =>{
      if(!mission){
        var newMission = generateMission(member.username)
        missions.create(newMission).then( newM=> io.emit('mission',newM))
      }
    })
  })

  socket.on('msg', msg => {
    messages.create(msg).then(newMsg => io.emit('msg',newMsg))
    .catch(console.log)

    checkWords(msg.text,msg.member.username).then( missionCompleted => {
      if(missionCompleted){
        setTimeout(()=>io.emit('mission_complete',missionCompleted),10000)
      }
    });

  });
});

