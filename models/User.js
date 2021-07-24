const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
	{
		username: {
			type: String,
			trim: true,
			required: [true, 'Username is required'],
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'email is required'],
			match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
			unique: true,
			lowercase: true,
			trim: true,
		},
		hashedPassword: {
			type: String,
			required: [true, 'Password is required'],
		},
		favouriteRecipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
		createdRecipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
		nationality: { type: String },
		age: { type: Number },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
