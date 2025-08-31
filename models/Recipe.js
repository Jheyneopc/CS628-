const { Schema, model } = require('mongoose');

const recipeSchema = new Schema(
  {
    name: { type: String, required: true },
    ingredients: [String],
    instructions: String,
    cookingTime: Number,
  },
  { timestamps: true }
);

module.exports = model('Recipe', recipeSchema);
