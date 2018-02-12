/**
 *
 *  Creates an express server that serves up our files and authorizes users to access the app using a JSONWebToken.
 *  Express handles logins, account creation, and bulk loading of extant messages on front end initialization. Socket.io is then
 *	used to handle creation of new messages and distributing them to clients.
 *
**/


const bodyParser = require('body-parser');
const express = require('express');
const expressJwt = require('express-jwt');
const path = require('path');

// Bookshelf handler utils
const Users = require('./controllers/userController.js');
const Messages = require('./controllers/messageController.js');

const { jwtSecret, sendToken } = require('./utils');


const app = express();


// Middleware
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use('/api/messages', expressJwt({ secret: jwtSecret }));


//---------------------------------------------------------------
//												API Endpoints
//---------------------------------------------------------------


// Create/send token on valid login
app.post('/api/login', (req, res) => {
	Users.getUser(
		req.body.username,
		req.body.password,
		(user) => {
			if (user) {
				sendToken(res, 200, user.username);
			}	else {
				res.sendStatus(404);
			}
		}
	);
});


// Add new user to db and send client a session token
app.post('/api/signup', (req, res) => {
	Users.userExists(req.body.username, (user) => {
		if (user) {
			res.sendStatus(400);		// Username already taken

		} else {
			Users.createUser(req.body.username, req.body.password, (user) => {
				if (user) {
					sendToken(res, 201, user.username);
				} else {
					res.sendStatus(500);
				}
			});
		}
	});
});


// Retreive 100 most recent messages
app.get('/api/messages', (req, res) => {
	Messages.getAllMessages((msgs) => {
		if (msgs) {
			res.status(200).json(msgs.slice(-100));
		} else {
			res.sendStatus(500);
		}
	});
});


// Redirect invalid paths to homepage
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});


const port = process.env.PORT || 8080;

// Export app and JWT secret for socket.io
module.exports = app.listen(port, () => console.log(`Express is running on localhost:${port}`));

