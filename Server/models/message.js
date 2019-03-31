var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  text:  String,
  date: Date,
  member: {username: String,
          animal: String
  
  },
  type: String // message or mission
});

module.exports = mongoose.model('message', messageSchema);