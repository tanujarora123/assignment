const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const userRoute = require('./routes/user');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/user', userRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} on PORT ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`);
	server.close(() => process.exit(1));
});
