/**
 * @typedef model
 * @property {string} _id
* @property {string} name
 */


var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
var modelSchema = new Schema({
	name: { type: String, required: true, unique: true},
	branch: { type: Schema.Types.ObjectId, required: true, ref: 'branch'}
}, { timestamps : true });
modelSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('model', modelSchema);
