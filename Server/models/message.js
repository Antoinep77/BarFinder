var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  text:  String,
  date: Date,
  member: {username: String},
});

module.exports = mongoose.model('message', messageSchema);