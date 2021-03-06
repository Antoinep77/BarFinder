var express = require('express');
var router = express.Router();
var messages = require('../models/message')

router.get('/', (req,res,next) =>{
    messages.find().then(msgList => res.json(msgList))
      .catch(console.log)
  })

router.delete('/', (req,res,next) =>{
  messages.deleteMany().then(r => res.json(r))
    .catch(console.log)
})

module.exports = router;
  