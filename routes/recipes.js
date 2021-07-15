const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const { getAllRecipes, getRecipeDetails, pushRecipeToFavourite, updateRecipe } = require('../controllers/recipes');

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/:id/details', checkIfLoggedIn, getRecipeDetails);
router.post('/:id/details', checkIfLoggedIn, pushRecipeToFavourite);
router.put('/:id', checkIfLoggedIn, updateRecipe);

module.exports = router;
