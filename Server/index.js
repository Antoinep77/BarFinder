var express = require('express')
var io = require('socket.io')(5000, { origins: '*:*' });

var messages = require("./models/message")
var missions = require("./models/mission")
var users = require('./models/user');


var mongoose = require('mongoose');
var checkWords = require('./missions/checkWord');
var generateMission = require('./missions/generateMission')

var messageRouter = require('./routes/messages');
var missionRouter = require('./routes/missions');

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/messages', messageRouter)
app.use('/missions', missionRouter)

app.listen(4000, function () {
  console.log('Example app listening on port 3000!')
})

var scoreMap = {complete:1000,blocked:500,failed:300}


io.on('connection', function (socket) {
  console.log("connected")

  socket.on('join', username => {
    users.findOne({username})
          .then(u =>{
            if (u){
              return u
            }else{
              return users.create({username,score:0})
            }
          }).then(u => users.find({}, null,{sort:{score: -1 }}))
          .then(userList=>io.emit('score',userList))

    missions.findOne({ current: true, username: username }).then(mission => {
      if (!mission) {
        var newMission = generateMission(username)
        missions.create(newMission).then(newM => socket.emit('mission', newM))
      }
      else {
        socket.emit('mission', mission)
      }
    }).catch(console.log)
  })


  socket.on('reaction', reaction => {
    if (reaction.reaction == "nope") {
      missions.findOne({ trigger_msg_id: reaction._id }).then(m => {
        if (m) {
          missions.findByIdAndUpdate(m._id, { blocked: true })
            .then(newM => io.emit('mission_blocked', { user: reaction.user, mission: newM }))
          users.findOneAndUpdate({username:reaction.user},{$inc:{score: scoreMap.blocked}})
          .then(u=>users.findOneAndUpdate({username:m.username},{$inc:{score: -scoreMap.blocked}})
          ).then(u => users.find({}, null,{sort:{score: -1 }}))
          .then(listUsers => io.emit('score',listUsers))

        } else {
          io.emit('mission_blocked_failed', { user: reaction.user })
          users.findOneAndUpdate({username:reaction.user},{$inc:{score: scoreMap.failed}})
          .then(u => users.find({}, null,{sort:{score: -1 }}))
          .then(listUsers => io.emit('score',listUsers))
        }
      }).catch(console.log)
    }
  })


  socket.on('msg', msg => {
    messages.create(msg).then(newMsg => {
      io.emit('msg', newMsg)
      checkWords(newMsg).then(missionCompleted => {
        if (missionCompleted) {
          //generate new mission
          missions.create(generateMission(missionCompleted.username))
            .then(newM => socket.emit('mission', newM))

          // wait a bit before 
          setTimeout((() => {
            missions.findById(missionCompleted._id).then(m => {
              if (!m.blocked) {
                missions.findByIdAndUpdate(m._id,{achieved:true})
                .then(m =>{
                   io.emit('mission_complete', { message: msg, mission: m });
                    return m.user
                  }).then(u =>users.findOneAndUpdate({username:u},{$inc:{score: scoreMap.complete}}))
                .then(u => users.find({}, null,{sort:{score: -1 }}))
                .then(listUsers => io.emit('score',listUsers))
               
              }
            })
          }), 10000)
        }
      });
    })

  });
});

