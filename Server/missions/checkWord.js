var missions = require('../models/mission');
var point = 10;

// return promise 
module.exports = (msgText,username) => {
    return missions.findOne({current:true, username}).then( m=>{
        if(m ){
            var ponctPattern = "[\\(\\)\\[\\]\"'\\-,;:\\/!\\?\\. ]"
            var regexpPattern = new RegExp("(^|"+ponctPattern+")"+m.word+"("+ponctPattern+"|$)");
            if(regexpPattern.test(msgText.toLowerCase())){
                return missions.findByIdAndUpdate(m._id,{current:false,point, date: new Date()})

            }
        }
        return null
    })
}