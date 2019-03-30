var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  text:  String,
  member: String
});

export var message = mongoose.model('message', messageSchema);