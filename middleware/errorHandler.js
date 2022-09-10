const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.statusCode = err.statusCode || 500;
	error.message = err.message || 'Server Error';

	console.log(err.name);

	res.status(error.statusCode).json({
		success: false,
		message: error.message,
	});
};

module.exports = errorHandler;
