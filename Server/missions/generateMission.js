function generateWord () {
    var fs = require('fs');
    var textByLine = fs.readFileSync('french_words.txt').toString().split("\n");
    var n = textByLine.length;
    var k = Math.random*n;
    return(textByLine[k].split(',')[1])
}


module.exports = (username) => {
    
    return {
        username,
        current:true,
        word:generateWord(),
    }
}