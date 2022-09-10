const asyncHandler = require('../utils/asyncHandler');
const CustomError = require('../utils/CustomError');
const UserModel = require('../model/user');

exports.register = asyncHandler(async (req, res, next) => {
	const { password } = req.body;

	if (!checkStrongPass(password)) {
		return next(new CustomError('Password is not strong enough', 501));
	}

	await UserModel.create(req.body);

	res.status(200).json({ message: 'Account successfully created' });
});

exports.login = asyncHandler(async (req, res, next) => {
	const { email, password, role } = req.body;

	if (!email || !password || !role) {
		return next(
			new CustomError(
				'Please provide Email, Password and Role for login',
				400
			)
		);
	}

	let user = await UserModel.findOne({ email });

	if (!user) {
		return next(new CustomError('Invalid Credentials', 401));
	}

	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return next(new CustomError('Invalid Credentials', 401));
	}

	if (user.role !== role) {
		return next(new CustomError('Invalid Credentials', 401));
	}

	const token = user.getSignedToken();

	user = { ...user._doc };
	delete user.password;

	res.status(200).json({
		message: 'Logged in successfully',
		data: user,
		token: { token, uid: user.uid, email: user.email },
	});
});

exports.getMe = asyncHandler(async (req, res, next) => {
	res.status(200).json({ success: true, data: req.user });
});

exports.getAllUsers = asyncHandler(async (req, res, next) => {
	const users = await UserModel.find(req.query);

	res.status(200).json({ success: true, data: users });
});

const checkStrongPass = pass => {
	const exp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
	return exp.test(pass);
};
