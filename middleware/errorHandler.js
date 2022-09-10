const CustomError = require('../utils/CustomError');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.statusCode = err.statusCode || 500;
	error.message = err.message || 'Server Error';

	console.log(err.name);
	//console.log(err);

	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map(val => val.message);
		error = new CustomError(message, 400);
	}

	if (err.name === 'MongoServerError' && err.code === 11000) {
		const message = 'Email or Phone already exists';
		error = new CustomError(message, 400);
	}

	res.status(error.statusCode).json({
		success: false,
		message: error.message,
	});
};

module.exports = errorHandler;
