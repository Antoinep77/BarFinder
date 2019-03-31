var fs = require('fs');

function generateWord () {
    var textByLine = fs.readFileSync('./missions/french_words.txt',{encoding:'utf8'}).split("\n");
    var n = textByLine.length;
    var k = Math.floor(Math.random()*n);
    return(textByLine[k].split(',')[1])
}


module.exports = (username) => {
    
    return {
        username,
        current:true,
        word:generateWord(),
    }
}