var fs = require('fs');
var i =0;
function generateWord () {
    var textByLine = fs.readFileSync('./missions/french_words.txt',{encoding:'utf8'}).split("\n");
    var n = textByLine.length;
    var k = Math.floor(Math.random()*n);
    return(textByLine[k].split(',')[1])
}
function generateWord2 () {
    var textByLine = fs.readFileSync('./missions/english_words.txt',{encoding:'utf8'}).split("\n");
    var text=textByLine[i].split(',')[1]
    i=i+1;
    return(text)
}


module.exports = (username) => {
    
    return {
        username,
        current:true,
        word:generateWord2(),
        blocked: false,
        achieved: false
    }
}