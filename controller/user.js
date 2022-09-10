const asyncHandler = require('../utils/asyncHandler');
const CustomError = require('../utils/CustomError');
const UserModel = require('../model/user');

exports.register = asyncHandler(async (req, res, next) => {
	const { password } = req.body;

	if (!checkStrongPass(password)) {
		return next(new CustomError('Password is not strong enough', 400));
	}

	const user = await UserModel.create(req.body);

	const token = user.getSignedToken();

	res.status(200).json({ success: true, data: user, token });
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

	const user = await UserModel.findOne({ email });

	if (!user) {
		return next(new CustomError('Invalid Credentials E', 400));
	}

	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return next(new CustomError('Invalid Credentials P', 400));
	}

	if (user.role !== role) {
		return next(new CustomError('Invalid Credentials R', 400));
	}

	const token = user.getSignedToken();

	res.status(200).json({ success: true, token });
});

exports.getMe = asyncHandler(async (req, res, next) => {
	res.status(200).json({ success: true, data: req.user });
});

const checkStrongPass = pass => {
	const exp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
	return exp.test(pass);
};
