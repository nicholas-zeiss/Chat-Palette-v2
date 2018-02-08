/**
 *
 *  Helper functions for interacting with the messages table
 *
**/


const Message = require('../models/message.js');


exports.createMessage = (msg, cb) => {
	new Message(msg)
		.save()
		.then(msg => msg ? cb(msg.toJSON()) : cb(null));
};

exports.getAllMessages = cb => {
	new Message()
		.fetchAll()
		.then(msgs => msgs ? cb(msgs.toJSON()) : cb(null));
};

