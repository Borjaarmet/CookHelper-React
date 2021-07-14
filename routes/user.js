const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const User = require('../models/User');

const router = express.Router();

router.get('/profile', checkIfLoggedIn, (req, res) => {
	const user = req.session.currentUser;
	res.json({ user });
});

router.put('/profile', checkIfLoggedIn, (req, res, next) => {
	const { _id } = req.session.currentUser;
	const { username, email, nationality, age, cookLevel } = req.body;
	User.findByIdAndUpdate(_id, { username, email, nationality, age, cookLevel }, { new: true })
		.then(updatedUser => {
			res.json({ user: updatedUser });
		})
		.catch(err => {
			next(err);
		});
});

router.get('/favourites', checkIfLoggedIn, (req, res, next) => {
	const user = req.session.currentUser;
	User.findById(user)
		.populate('favouriteRecipes')

		.then(userFounded => {
			res.json({ favourites: userFounded.favouriteRecipes });
		})
		.catch(err => {
			next(err);
		});
});

router.delete('/favourites/:id', checkIfLoggedIn, (req, res, next) => {
	const user = req.session.currentUser;
	const { id } = req.params;
	// eslint-disable-next-line no-underscore-dangle
	User.findById(user._id)
		// eslint-disable-next-line no-shadow
		.then(user => {
			user.favouriteRecipes.splice(id, 1);
			return user.save();
		})
		.then(deletedRecipe => res.json({ recipe: deletedRecipe }))
		.catch(err => {
			next(err);
		});
});

module.exports = router;
