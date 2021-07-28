const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const {
	getAllRecipes,
	getRecipeDetails,
	pushRecipeToFavourite,
	updateRecipe,
	deletedRecipeFromFav,
} = require('../controllers/recipes');

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/:id/details', checkIfLoggedIn, getRecipeDetails);
router.post('/:id/details', checkIfLoggedIn, pushRecipeToFavourite);
router.delete('/favourites/:id', checkIfLoggedIn, deletedRecipeFromFav);
router.put('/:id', checkIfLoggedIn, updateRecipe);

module.exports = router;
