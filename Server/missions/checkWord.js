var missions = require('../models/mission');
var point = 10;

// return promise 
module.exports = (msg) => {
    var msgText = msg.text;
    var username = msg.member.username;
    return missions.findOne({current:true, username}).then( m=>{
        if(m ){
            var ponctPattern = "[\\(\\)\\[\\]\"'\\-,;:\\/!\\?\\. ]"
            var regexpPattern = new RegExp("(^|"+ponctPattern+")"+m.word.toLowerCase()+"("+ponctPattern+"|$)");
            if(regexpPattern.test(msgText.toLowerCase())){
                return missions.findByIdAndUpdate(m._id,{trigger_msg_id:msg._id,current:false,point, date: new Date()})

            }
        }
        return null
    })
}