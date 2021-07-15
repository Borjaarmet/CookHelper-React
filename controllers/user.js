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
	User.findById(user)
		.populate('favouriteRecipes')

		.then(userFounded => {
			res.json({ favourites: userFounded.favouriteRecipes });
		})
		.catch(err => {
			next(err);
		});
};

const createdRecipe = (req, res) => {
	const user = req.session.currentUser;
	const { recipeName, difficulty, TimeToCook, ingredientsList, Steps, videoLink } = req.body;
  User.findById(user).then(user => {
    Recipe.create({ recipeName, difficulty, TimeToCook, ingredientsList, Steps, videoLink }).then(recipe => {
		user.createdRecipes.push(recipe);
		user.save();
		res.json({ recipeToCreatedRecipes: recipe });
	});
  })
	
};

const deletedRecipeFromFav = (req, res, next) => {
	const user = req.session.currentUser;
	const { id } = req.params;
	// eslint-disable-next-line no-underscore-dangle
	User.findById(user._id)
		// eslint-disable-next-line no-shadow
		.then(user => {
			user.favouriteRecipes.splice(id, 1);
			return user.save();
		})
		.then(recipe => res.json({ deletedRecipe: recipe }))
		.catch(err => {
			next(err);
		});
};

module.exports = {
	getUserInSession,
	getUserProfile,
	getUpdatedProfile,
	getUserFavouritesRecipes,
	deletedRecipeFromFav,
	createdRecipe,
};
