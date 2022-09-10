const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

userSchema.methods.getSignedToken = function () {
	const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: '30 days',
	});
	return token;
};

userSchema.methods.matchPassword = async function (pass) {
	return await bcrypt.compare(pass, this.password);
};

userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(this.password, salt);

	//password hash
	this.password = hash;

	//Alphanumeric Id
	this.uid = generateAlphaNumeric();

	next();
});

//13 Character long
const generateAlphaNumeric = () => {
	const chars =
		'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let result = '';

	for (let i = 0; i < 13; i++) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}

	return result;
};

module.exports = mongoose.model('User', userSchema);
