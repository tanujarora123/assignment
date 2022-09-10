class CustomError extends Error {
	constructor(msg, statusCode) {
		this.msg = msg;
		this.statusCode = statusCode;
	}
}

module.exports = CustomError;
