var express = require('express')
var io = require('socket.io')(5000,{ origins: '*:*'});
var messages  = require("./models/message")
var missions = require("./models/mission")
var mongoose = require('mongoose');
var checkWords = require('./checkMissions/checkWord');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/messages', (req,res,next) =>{
  messages.find().then(msgList => res.json(msgList))
    .catch(console.log)
})

app.post('/mission/:user/:word', (req,res,next) =>{
  missions.create({word: req.params.word, username: req.params.user, current: true})
  .then(m => res.json(m))
    .catch(console.log)
})

app.get('/mission', (req,res,next) =>{
  missions.find()
  .then(missionList => res.json(missionList))
    .catch(console.log)
})

app.delete('/messages', (req,res,next) =>{
  messages.delete().then(r => res.json(r))
    .catch(console.log)
})


io.on('connection', function (socket) {
  console.log("connected")

  socket.on('msg', msg => {
    messages.create(msg).then(newMsg => io.emit('msg',newMsg))
    .catch(console.log)
    checkWords(msg.text,msg.member.username).then(console.log,console.log)
  });
});

app.listen(4000, function () {
  console.log('Example app listening on port 3000!')
})