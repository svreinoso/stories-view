var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var branchSchema = new Schema({
	'name' : {type: String, required: true, unique: true}
});

module.exports = mongoose.model('branch', branchSchema);
