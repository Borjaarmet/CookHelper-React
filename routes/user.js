const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const {
	getUserInSession,
	getUserProfile,
	getUpdatedProfile,
	getUserFavouritesRecipes,
	deletedRecipeFromFav,
	createRecipe,
	getUserCreatedRecipes,
	deletedRecipeFromCreatedList,
	// updatedRecipe,
} = require('../controllers/user');

const router = express.Router();

router.get('/', checkIfLoggedIn, getUserInSession);
router.get('/:id/profile', checkIfLoggedIn, getUserProfile);
router.put('/:id/profile', checkIfLoggedIn, getUpdatedProfile);
router.get('/create', checkIfLoggedIn, getUserCreatedRecipes);
router.post('/create', checkIfLoggedIn, createRecipe);
// router.put('/create/:id', checkIfLoggedIn, updatedRecipe);
router.delete('/create/:id', checkIfLoggedIn, deletedRecipeFromCreatedList);
router.get('/favourites', checkIfLoggedIn, getUserFavouritesRecipes);
router.delete('/favourites/:id', checkIfLoggedIn, deletedRecipeFromFav);

module.exports = router;
