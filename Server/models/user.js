var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:  String,
  animal  :  String,
  score:  Number
  
});

module.exports = mongoose.model('user', userSchema);