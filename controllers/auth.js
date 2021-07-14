const bcrypt = require('bcrypt');
const createError = require('http-errors');
const User = require('../models/User');

const bcryptSalt = 10;

const getWhoAmI = (req, res, next) => {
	if (req.session.currentUser) {
		res.status(200).json(req.session.currentUser);
	} else {
		next(createError(401));
	}
};

const getUserSignup = async (req, res, next) => {
	const { username, password, email } = res.locals.auth;
	try {
		const user = await User.findOne({ username });
		if (user) {
			return next(createError(422));
		}

		const salt = bcrypt.genSaltSync(bcryptSalt);
		const hashedPassword = bcrypt.hashSync(password, salt);

		const newUser = await User.create({ username, hashedPassword, email });
		req.session.currentUser = newUser;
		return res.json(newUser);
	} catch (error) {
		return next(error);
	}
};

const getUserLogin = async (req, res, next) => {
	const { username, password } = res.locals.auth;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return next(createError(404));
		}
		if (bcrypt.compareSync(password, user.hashedPassword)) {
			req.session.currentUser = user;
			return res.json(user);
		}
		return next(createError(404));
	} catch (error) {
		return next(error);
	}
};

const getUserLogout = (req, res, next) => {
	req.session.destroy(err => {
		if (err) {
			next(err);
		}
		return res.status(204).send();
	});
};

module.exports = {
	getWhoAmI,
	getUserSignup,
	getUserLogin,
	getUserLogout,
};
