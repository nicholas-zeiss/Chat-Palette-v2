/**
 *
 *  Creates a socket.io instance that piggybacks off of our express server. Clients
 *	must be authorized using a JSONWebToken. Responsible for creating messages sent
 *	by a client and then distributing to all active clients.
 *
**/


const Messages = require('./controllers/messageController.js');
const server = require('./expressServer');
const { jwtSecret } = require('./utils');

const socketio = require('socket.io')(server.app);
const socketioJwt = require('socketio-jwt');


const authorize = socketioJwt.authorize({
	secret: jwtSecret,
	timeout: 15000
});

const messageListener = (socket) => {
	socket.on('message', (msg) => {
		Messages.createMessage(msg, (msg) => {
			if (msg) {
				socketio.emit('message', msg);
			} else {
				socket.emit('500');
			}
		});
	});
};


socketio
	.on('connection', authorize)
	.on('authenticated', messageListener);

