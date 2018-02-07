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
const jwt = require('jsonwebtoken');
const path = require('path');

// Bookshelf handler utils
const Users = require('./controllers/userController.js');
const Messages = require('./controllers/messageController.js');

const app = express();
const jwtSecret = 'chat-pallette';


// Middleware
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use('/api/messages', expressJwt({ secret: jwtSecret }));



//---------------------------------------------------------------
//												API Endpoints
//---------------------------------------------------------------


//create/send token on valid login
app.post('/api/login', (req, res) => {
	Users.getUser(req.body.username, req.body.password, user => {
		if (user) {
			res
				.status(200)
				.json(jwt.sign(user, jwtSecret, { expiresIn: '12h' }));

		}	else {
			res.sendStatus(404);
		}
	});
});


// add new user to db and send client a session token
app.post('/api/signup', (req, res) => {
	Users.userExists(req.body.username, user => {
		if (user) {
			res.sendStatus(400);		// username already taken

		} else {
			Users.createUser(req.body.username, req.body.password, user => {
				if (user) {
					res
						.status(201)
						.json(jwt.sign(user, jwtSecret, { expiresIn: '12h' }));

				} else {
					res.sendStatus(500);
				}
			});
		}
	});
});


// retreive 100 most recent messages
app.get('/api/messages', (req, res) => {
	Messages.getAllMessages(msgs => {
		if (msgs) {
			res
				.status(200)
				.json(msgs.slice(-100));

		} else {
			res.sendStatus(500);
		}
	});
});


// redirect invalid paths to homepage
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});


const port = process.env.PORT || 8080;

// export app and JWT secret for socket.io
exports.app = app.listen(port, () => console.log(`Express is running on localhost:${port}`));
exports.jwtSecret = jwtSecret;

