var express = require('express');
var router = express.Router();

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

module.exports = router;