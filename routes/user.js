const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const {
	getUserInSession,
	getUserProfile,
	getUpdatedProfile,
	getUserFavouritesRecipes,
	deletedRecipeFromFav,
	createdRecipe,
	getUserCreatedRecipes,
	deletedRecipeFromCreatedList,
} = require('../controllers/user');

const router = express.Router();

router.get('/', checkIfLoggedIn, getUserInSession);
router.get('/:id/profile', checkIfLoggedIn, getUserProfile);
router.put('/:id/profile', checkIfLoggedIn, getUpdatedProfile);
router.get('/create', checkIfLoggedIn, getUserCreatedRecipes);
router.post('/create', checkIfLoggedIn, createdRecipe);
router.delete('/create/:id', checkIfLoggedIn, deletedRecipeFromCreatedList);
router.get('/favourites', checkIfLoggedIn, getUserFavouritesRecipes);
router.delete('/favourites/:id', checkIfLoggedIn, deletedRecipeFromFav);

module.exports = router;
