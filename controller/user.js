exports.register = (req, res, next) => {
	res.status(200).json({ success: true, msg: 'Register' });
};

exports.login = (req, res, next) => {
	res.status(200).json({ success: true, msg: 'Login' });
};
