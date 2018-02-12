/**
 *
 *  Shared utilities for backend.
 *
**/


const jwt = require('jsonwebtoken');


const jwtSecret = 'chat-pallette';

const logError = (label) => (
	(error) => {
		console.log(label);
		console.log(error);

		return error;
	}
);

const sendToken = (response, code, username) => {
	response
		.status(code)
		.json(jwt.sign(
			{ username },
			jwtSecret,
			{ expiresIn: '12h' }
		));
};


module.exports = {
	jwtSecret,
	logError,
	sendToken
};

