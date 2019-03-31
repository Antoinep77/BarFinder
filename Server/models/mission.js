var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var missionSchema = new Schema({
  username:  String,
  word: String,
  point: Number,
  current: Boolean,
  date: Date
});

module.exports = mongoose.model('mission', missionSchema);