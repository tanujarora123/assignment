const asyncHandler = require('../utils/asyncHandler');

exports.register = asyncHandler(async (req, res, next) => {
	console.log(req.body);

	res.status(200).json({ success: true, msg: 'Register' });
});

exports.login = asyncHandler(async (req, res, next) => {
	res.status(200).json({ success: true, msg: 'Login' });
});
