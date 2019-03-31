var express = require('express');
var router = express.Router();
var missions = require('../models/mission')
var generateMission = require('../missions/generateMission')

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
      var newMission = generateMission(req.params.username)
      missions.create(newMission).then( newM=> res.json(newM))
    }
    else{
      res.json(mission)
    }
  }).catch(console.log)
})


module.exports = router;