var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var carSchema = new Schema({
	'carDoor' : Number,
	'color' : String
});

module.exports = mongoose.model('car', carSchema);
