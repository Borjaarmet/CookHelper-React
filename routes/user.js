const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const {
	getUserInSession,
	getUserProfile,
	getUpdatedProfile,
	getUserFavouritesRecipes,
	deletedRecipeFromFav,
	createdRecipe,
} = require('../controllers/user');

const router = express.Router();

router.get('/', checkIfLoggedIn, getUserInSession);
router.get('/:id/profile', checkIfLoggedIn, getUserProfile);
router.put('/profile', checkIfLoggedIn, getUpdatedProfile);
router.post('/profile/create', checkIfLoggedIn, createdRecipe);
router.get('/favourites', checkIfLoggedIn, getUserFavouritesRecipes);
router.delete('/favourites/:id', checkIfLoggedIn, deletedRecipeFromFav);

module.exports = router;
