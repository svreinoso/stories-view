var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var branchSchema = new Schema({
	'name' : String,
	'color' : String
});

module.exports = mongoose.model('branch', branchSchema);
