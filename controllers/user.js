const User = require('../models/User');
const Recipe = require('../models/recipe');

const getUserInSession = (req, res) => {
	const user = req.session.currentUser;
	// res.json({ user });
	res.json({ userinSession: user });
};

const getUserProfile = (req, res) => {
	const { _id } = req.session.currentUser;
	User.findById(_id).then(user => {
		res.json({ userProfile: user });
	});
};

const getUpdatedProfile = (req, res, next) => {
	const { _id } = req.session.currentUser;
	const { username, email, nationality, age, cookLevel } = req.body;
	User.findByIdAndUpdate(_id, { username, email, nationality, age, cookLevel }, { new: true })
		.then(updatedUser => {
			res.json({ user: updatedUser });
		})
		.catch(err => {
			next(err);
		});
};

const getUserFavouritesRecipes = (req, res, next) => {
	const user = req.session.currentUser;
	// eslint-disable-next-line no-underscore-dangle
	User.findById(user._id)
		.populate('favouriteRecipes')

		.then(userFounded => {
			res.json({ favourites: userFounded.favouriteRecipes });
		})
		.catch(err => {
			next(err);
		});
};

const getUserCreatedRecipes = (req, res, next) => {
	const user = req.session.currentUser;
	// eslint-disable-next-line no-underscore-dangle
	User.findById(user._id)
		.populate('createdRecipes')

		.then(userFounded => {
			res.json({ created: userFounded.createdRecipes });
		})
		.catch(err => {
			next(err);
		});
};

const createRecipe = async (req, res) => {
	const loggedInUser = req.session.currentUser;
	const { recipeName, difficulty, TimeToCook, ingredientsList, Steps, videoLink } = req.body;
	// eslint-disable-next-line no-shadow
	const recipe = await Recipe.create({ recipeName, difficulty, TimeToCook, ingredientsList, Steps, videoLink });
	// eslint-disable-next-line no-underscore-dangle
	const user = await User.findById(loggedInUser._id);
	// eslint-disable-next-line no-underscore-dangle
	user.createdRecipes.push(recipe);
	user.save();
	res.json({ newRecipe: recipe });
};

const updateRecipe = (req, res) => {
	const { id } = req.params;
	console.log("id:", id)
	const { recipeName, difficulty, TimeToCook, ingredientsList, Steps, videoLink } = req.body;
	Recipe.findByIdAndUpdate(
		id,
		{ recipeName, difficulty, TimeToCook, ingredientsList, Steps, videoLink },
		{ new: true }
	).then(newRecipe => {
		console.log("newrecipe:", newRecipe)
		res.json({ updatedRecipe: newRecipe });
	});
};

module.exports = {
	getUserInSession,
	getUserProfile,
	getUpdatedProfile,
	getUserFavouritesRecipes,
	getUserCreatedRecipes,
	createRecipe,
	updateRecipe,
};
