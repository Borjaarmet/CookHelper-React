/* eslint-disable no-underscore-dangle */
const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const Recipe = require('../models/recipe');

const router = express.Router();

router.get('/', checkIfLoggedIn, (req, res) => {
	Recipe.find().then(recipes => {
		res.json({ recipes });
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
