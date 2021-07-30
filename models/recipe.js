const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const recipeSchema = new Schema({
	recipeName: { type: String },
	difficulty: { type: String },
	TimeToCook: { type: Number },
	ingredientsList: [{ type: String }],
	Steps: [String],
	videoLink: { type: String },
});

module.exports = model('Recipe', recipeSchema);
