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

const deletedRecipeFromFav = async (req, res) => {
	const loggedInUser = req.session.currentUser;
	const { id } = req.params;
	console.log(req.params);
	try {
		// eslint-disable-next-line no-underscore-dangle
		const user = await User.findById(loggedInUser._id);
		// eslint-disable-next-line no-shadow
		// eslint-disable-next-line no-underscore-dangle
		// const recipe = await Recipe.findById(id);
		const index = user.favouriteRecipes.indexOf(id);
		user.favouriteRecipes.splice(index, 1);
		user.save();
		req.session.currentUser = user;
		res.json({ status: 'success', deletedRecipe: id });
	} catch (error) {
		console.log(error);
	}
};

// const createRecipe = async (req, res) => {
// 	const loggedInUser = req.session.currentUser;
// 	const { recipeName, difficulty, TimeToCook, ingredientsList, Steps, videoLink } = req.body;
// 	// eslint-disable-next-line no-shadow
// 	const recipe = await Recipe.create({ recipeName, difficulty, TimeToCook, ingredientsList, Steps, videoLink });
// 	// eslint-disable-next-line no-underscore-dangle
// 	const user = await User.findById(loggedInUser._id);
// 	// eslint-disable-next-line no-underscore-dangle
// 	user.createdRecipes.push(recipe);
// 	user.save();
// 	res.json({ newRecipe: recipe });
// };

const updateRecipe = (req, res) => {
	const { id } = req.params;
	const { recipeName, difficulty, TimeToCook, ingredientsList, Steps, videoLink } = req.body;
	Recipe.findByIdAndUpdate(
		id,
		{ recipeName, difficulty, TimeToCook, ingredientsList, Steps, videoLink },
		{ new: true }
	).then(Recipeupdated => {
		return res.json({
			updatedRecipe: Recipeupdated,
		});
	});
};

module.exports = {
	getAllRecipes,
	getRecipeDetails,
	pushRecipeToFavourite,
	deletedRecipeFromFav,
	updateRecipe,
};
