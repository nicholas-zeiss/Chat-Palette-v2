/**
 *
 *  Helper functions for interacting with the messages table
 *
**/


const Message = require('../models/message.js');
const { logError } = require('../utils');


exports.createMessage = (msg, cb) => {
	new Message(msg)
		.save()
		.then((msg) => msg ? cb(msg.toJSON()) : cb(null))
		.catch(logError('Error creating message in db:'));
};


exports.getAllMessages = (cb) => {
	new Message()
		.fetchAll()
		.then((msgs) => msgs ? cb(msgs.toJSON()) : cb(null))
		.catch(logError('Error getting messages from db:'));
};

