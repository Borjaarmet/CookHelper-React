const Recipe = require('../models/recipe');
const User = require('../models/User');

const getAllRecipes = (req, res) => {
	Recipe.find().then(recipes => {
		res.json({ recipes });
	});
};

const getRecipeDetails = (req, res, next) => {
	Recipe.findById(req.params.id)
		.then(foundedRecipe => {
			res.json({ recipe: foundedRecipe });
		})
		.catch(err => {
			next(err);
		});
};

const pushRecipeToFavourite = (req, res, next) => {
	const user = req.session.currentUser;
	const { id } = req.params;
	// eslint-disable-next-line no-underscore-dangle
	User.findById(user._id)
		// eslint-disable-next-line no-shadow
		.then(user => {
			if (user.favouriteRecipes.includes(id) === true) {
				res.json('this recipe is already in your list');
				return;
			}
			user.favouriteRecipes.push(id);
			user.save();
			res.json({ recipeToFav: id });
		})
		.catch(err => {
			next(err);
		});
};

const createRecipe = (req, res) => {
	const { recipeName, difficulty, TimeToCook, ingredientsList, Steps, videoLink } = req.body;
	Recipe.create({ recipeName, difficulty, TimeToCook, ingredientsList, Steps, videoLink }).then(recipe => {
		res.json({ recipeCreated: recipe });
	});
};

module.exports = {
	getAllRecipes,
	getRecipeDetails,
	pushRecipeToFavourite,
	createRecipe,
};
