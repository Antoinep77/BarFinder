var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var missionSchema = new Schema({
  username:  String,
  word: String,
  point: Number
});

module.exports = mongoose.model('mission', missionSchema);