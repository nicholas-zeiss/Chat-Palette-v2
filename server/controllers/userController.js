/**
 *
 *  Helper functions for interacting with the user table
 *
**/


const bcrypt = require('bcryptjs');

const User = require('../models/user.js');
const { logError } = require('../utils');


exports.createUser = (username, password, cb) => {
	new User({
		username,
		password: bcrypt.hashSync(password)
	})
		.save()
		.then((user) => user ? cb(user.toJSON()) : cb(null))
		.catch(logError('Error creating user in db:'));
};


exports.getUser = (username, password, cb) => {
	new User({ username })
		.fetch()
		.then((user) => {
			if (user && bcrypt.compareSync(password, user.get('password'))) {
				return cb(user.toJSON());
			} else {
				return cb(null);
			}
		})
		.catch(logError('Error retreiving user in db:'));
};


exports.userExists = (username, cb) => {
	new User({ username })
		.fetch()
		.then((user) => user ? cb(user.toJSON()) : cb(null))
		.catch(logError('Error finding user in db:'));
};

