var express = require('express');
var router = express.Router();
var missions = require('../models/mission')

router.post('/:user/:word', (req,res,next) =>{
    missions.create({word: req.params.word, username: req.params.user, current: true})
    .then(m => res.json(m))
      .catch(console.log)
  })
  
router.get('/', (req,res,next) =>{
    missions.find()
    .then(missionList => res.json(missionList))
      .catch(console.log)
})

router.get('/:username', (req,res,next) =>{
  missions.findOne({current:true,username: req.params.username}).then(mission =>{
    if(!mission){
      var newMission = generateMission(member.username)
      missions.create(newMission).then( newM=> res.json(newM))
    }
  })
})


module.exports = router;