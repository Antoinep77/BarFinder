var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var missionSchema = new Schema({
  username:  String,
  word: String,
  point: Number
});

export var mission = mongoose.model('mission', missionSchema);