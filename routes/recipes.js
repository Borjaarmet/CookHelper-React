const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const {
	getAllRecipes,
	getRecipeDetails,
	pushRecipeToFavourite,
	deletedRecipeFromFav,
	deletedRecipeFromCreatedList,
} = require('../controllers/recipes');

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/:id/details', checkIfLoggedIn, getRecipeDetails);
router.post('/:id/details', checkIfLoggedIn, pushRecipeToFavourite);
router.put('/favourites/:id', checkIfLoggedIn, deletedRecipeFromFav);
router.put('/create/:id', checkIfLoggedIn, deletedRecipeFromCreatedList);


module.exports = router;
