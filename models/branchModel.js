var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var branchSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name : {type: String, required: true, unique: true}
});

module.exports = mongoose.model('branch', branchSchema);
