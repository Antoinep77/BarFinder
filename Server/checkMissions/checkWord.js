var missions = require('../models/mission');
var point = 10;

// return promise 
module.exports = (msgText,username) => {
    return missions.findOne({current:true, username}).then( m=>{
        if(m ){
            var ponctPattern = "[\\(\\)\\[\\]\"'\\-,;:\\/!\\?\\. ]"
            var regexpPattern = new RegExp("(^|"+ponctPattern+")"+m.word+"("+ponctPattern+"|$)");
            console.log(msgText)
            console.log(regexpPattern)
            if(regexpPattern.test(msgText.toLowerCase())){
                missions.findByIdAndUpdate(m._id,{point}).then()
                console.log("mission achieve")
                return true;
            }
        }
        return false
    })
}