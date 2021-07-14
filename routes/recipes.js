/* eslint-disable no-underscore-dangle */
const express = require('express');
const { getAllRecipes, getRecipeDetails, pushRecipeToFavourite, createRecipe } = require('../controllers/recipes');
const { checkIfLoggedIn } = require('../middlewares');

const router = express.Router();

router.get('/', checkIfLoggedIn, getAllRecipes);
router.get('/:id/details', checkIfLoggedIn, getRecipeDetails);
router.post('/:id/details', checkIfLoggedIn, pushRecipeToFavourite);
router.post('/', checkIfLoggedIn, createRecipe);

// router.put('/:id', checkIfLoggedIn, (req, res) => {
// 	const { id } = req.params;
// 	const { recipeName, difficulty, TimeToCook, ingredientsList, Steps, videoLink } = req.body;
// 	Recipe.findByIdAndUpdate(
// 		id,
// 		{ recipeName, difficulty, TimeToCook, ingredientsList, Steps, videoLink },
// 		{ new: true }
// 	).then(Recipeupdated => {
// 		// if (Recipeupdated === null) {
// 		// 	return res.status(404).json({ error: 'Recipe not founded' });
// 		// }
// 		return res.json({
// 			updatedRecipe: Recipeupdated,
// 		});
// 	});
// });

module.exports = router;
