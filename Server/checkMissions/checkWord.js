var missions = require('../models/mission');

module.exports = (msgText,username) => {
    missions.findOne({current:true, username}).then( m=>{
        if(m ){
            var regexpPattern = new RegExp("[\(\)\[\]\"'\-,;:\/!\?]?"+m.word +"[\(\)\[\]\"'\-,;:\/!\?]?");
            
        }
    })
}