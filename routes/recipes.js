// routes/recipes.js
const express = require('express');
const { Types } = require('mongoose');
const Recipe = require('../models/Recipe');

const router = express.Router();

// Small helper: validate Mongo ObjectId
function isValidId(id) {
  return Types.ObjectId.isValid(id);
}

/**
 * GET /recipes
 * List all recipes
 */
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().lean();
    res.json(recipes);
  } catch (err) {
    console.error('GET /recipes error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /recipes
 * Create a new recipe
 */
router.post('/', async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    // 201 because we created a resource
    res.status(201).json(recipe);
  } catch (err) {
    console.error('POST /recipes error:', err);
    res.status(400).json({ message: 'Invalid data' });
  }
});

/**
 * GET /recipes/:id
 * Get one recipe by id
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: 'Invalid id' });

    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    res.json(recipe);
  } catch (err) {
    console.error('GET /recipes/:id error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * PUT /recipes/:id
 * Update a recipe (replace fields you send)
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: 'Invalid id' });

    const updated = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Recipe not found' });

    res.json(updated);
  } catch (err) {
    console.error('PUT /recipes/:id error:', err);
    res.status(400).json({ message: 'Invalid data' });
  }
});

/**
 * DELETE /recipes/:id
 * Remove a recipe
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: 'Invalid id' });

    const deleted = await Recipe.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Recipe not found' });

    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    console.error('DELETE /recipes/:id error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
