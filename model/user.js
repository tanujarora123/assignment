const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	uid: {
		type: String,
	},
	first_name: {
		type: String,
		trim: true,
		required: [true, 'First name is required'],
	},
	last_name: {
		type: String,
		trim: true,
		required: [true, 'Last name is required'],
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'Email is required'],
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please add a valid email',
		],
	},
	mobile: {
		type: String,
		unique: true,
		required: [true, 'Mobile number is required'],
		maxlength: [10, 'Mobile number can not be longer than 10 characters'],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
	},
	role: {
		type: String,
		enum: ['admin', 'member', 'trainer'],
		default: 'member',
	},
	status: {
		type: String,
		enum: ['active', 'inactive'],
		default: 'active',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('User', userSchema);
