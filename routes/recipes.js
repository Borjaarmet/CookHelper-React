/* eslint-disable no-underscore-dangle */
const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const Recipe = require('../models/recipe');
const User = require('../models/User');

const router = express.Router();

router.get('/', checkIfLoggedIn, (req, res) => {
	Recipe.find().then(recipes => {
		res.json({ recipes });
	});
});

router.get('/:id/details', checkIfLoggedIn, (req, res, next) => {
	Recipe.findById(req.params.id)
		.then(foundedRecipe => {
			res.json({ recipe: foundedRecipe });
		})
		.catch(err => {
			next(err);
		});
});

router.post('/:id/details', checkIfLoggedIn, (req, res, next) => {
	const user = req.session.currentUser;
	const { id } = req.params;
	User.findById(user._id)
		// eslint-disable-next-line no-shadow
		.then(user => {
			if (user.favouriteRecipes.includes(id) === true) {
				res.json('this recipe is already in your list');
				return;
			}
			user.favouriteRecipes.push(id);
			user.save();
			res.json({ recipe: id });
		})
		.catch(err => {
			next(err);
		});
});

router.post('/', checkIfLoggedIn, (req, res) => {
	const { recipeName, difficulty, TimeToCook, ingredientsList, Steps, videoLink } = req.body;
	Recipe.create({ recipeName, difficulty, TimeToCook, ingredientsList, Steps, videoLink }).then(recipe => {
		res.json({ recipeCreated: recipe });
	});
});

router.put('/:id', checkIfLoggedIn, (req, res) => {
	const { id } = req.params;
	const { recipeName, difficulty, TimeToCook, ingredientsList, Steps, videoLink } = req.body;
	Recipe.findByIdAndUpdate(
		id,
		{ recipeName, difficulty, TimeToCook, ingredientsList, Steps, videoLink },
		{ new: true }
	).then(Recipeupdated => {
		// if (Recipeupdated === null) {
		// 	return res.status(404).json({ error: 'Recipe not founded' });
		// }
		return res.json({
			updatedRecipe: Recipeupdated,
		});
	});
});

router.delete('/:id', checkIfLoggedIn, (req, res) => {
	const { id } = req.params;
	Recipe.findByIdAndDelete(id).then(deletedRecipe => {
		res.json({ deleted: deletedRecipe });
	});
});

module.exports = router;
