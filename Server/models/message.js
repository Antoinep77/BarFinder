var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  text:  String,
  member: {username: String}
});

module.exports = mongoose.model('message', messageSchema);