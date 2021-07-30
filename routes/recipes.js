const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const {
	getAllRecipes,
	getRecipeDetails,
	pushRecipeToFavourite,
	updateRecipe,
	deletedRecipeFromFav,
  deletedRecipeFromCreatedList,
} = require('../controllers/recipes');

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/:id/details', checkIfLoggedIn, getRecipeDetails);
router.post('/:id/details', checkIfLoggedIn, pushRecipeToFavourite);
router.put('/favourites/:id', checkIfLoggedIn, deletedRecipeFromFav);
<<<<<<< HEAD
=======
router.put('/create/:id', checkIfLoggedIn, deletedRecipeFromCreatedList);
>>>>>>> 92bbbcf7096ff6d6affee98b0e6a8e777328c792
router.put('/:id', checkIfLoggedIn, updateRecipe);

module.exports = router;
