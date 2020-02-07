var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth');

var UserSchema = new Schema({
	'username' : String,
	'email' : String,
	'firstName' : String,
	'lastName' : String,
	'birthday' : Date,
	'address' : String,
	'phoneNumber' : String,
	'hash' : String,
	'salt' : String
});


UserSchema.methods.validPassword = function (password) {
	const hash = crypto
		.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
		.toString('hex');
	return this.hash === hash;
};

UserSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto
		.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
		.toString('hex');
};

UserSchema.methods.generateJWT = function () {
	const today = new Date();
	const exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign(
		{
			id: this._id,
			username: this.username,
			exp: parseInt(exp.getTime() / 1000),
		},
		secret
	);
};

UserSchema.methods.toAuthJSON = function () {
	return {
		username: this.username,
		email: this.email,
		token: this.generateJWT(),
		bio: this.bio,
		image: this.image,
	};
};

UserSchema.methods.toProfileJSONFor = function (user) {
	return {
		username: this.username,
		bio: this.bio,
		image:
			this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
		following: user ? user.isFollowing(this._id) : false,
	};
};

module.exports = mongoose.model('user', UserSchema);
