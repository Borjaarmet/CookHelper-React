const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const {
	getUserInSession,
	getUserProfile,
	getUpdatedProfile,
	getUserFavouritesRecipes,
	createRecipe,
	getUserCreatedRecipes,
	updateRecipe,
} = require('../controllers/user');

const router = express.Router();

router.get('/', checkIfLoggedIn, getUserInSession);
router.get('/:id/profile', checkIfLoggedIn, getUserProfile);
router.put('/:id/profile', checkIfLoggedIn, getUpdatedProfile);
router.get('/create', checkIfLoggedIn, getUserCreatedRecipes);
router.post('/create', checkIfLoggedIn, createRecipe);
router.get('/favourites', checkIfLoggedIn, getUserFavouritesRecipes);
router.put('/create/:id', checkIfLoggedIn, updateRecipe);

module.exports = router;
