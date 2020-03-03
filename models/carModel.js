var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var carSchema = new Schema({
	'carDoor' : Number,
	'color' : String,
	discounts: [
		{ percent: Number, startDate: Date, endDate: Date, createdDate: Date }
	],
	price: Number,
	model: { type: Schema.Types.ObjectId, required: true, ref: 'model' }
});

module.exports = mongoose.model('car', carSchema);
