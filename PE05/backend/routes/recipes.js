// backend/routes/recipes.js
const express = require("express");
const { ObjectId } = require("mongodb");
const { getCollection } = require("../db");

const router = express.Router();

// GET /api/recipes
router.get("/", async (req, res) => {
  try {
    const col = getCollection();
    const recipes = await col.find().sort({ createdAt: -1 }).toArray();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching recipes." });
  }
});

// POST /api/recipes
router.post("/", async (req, res) => {
  try {
    const { name, ingredients, instructions } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required." });
    const doc = {
      name,
      ingredients: ingredients || "",
      instructions: instructions || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const col = getCollection();
    const result = await col.insertOne(doc);
    res.status(201).json({ _id: result.insertedId, ...doc });
  } catch {
    res.status(500).json({ error: "Error creating recipe." });
  }
});

// GET /api/recipes/:id
router.get("/:id", async (req, res) => {
  try {
    const col = getCollection();
    const recipe = await col.findOne({ _id: new ObjectId(req.params.id) });
    if (!recipe) return res.status(404).json({ error: "Recipe not found." });
    res.json(recipe);
  } catch {
    res.status(400).json({ error: "Invalid recipe ID." });
  }
});

// PUT /api/recipes/:id
router.put("/:id", async (req, res) => {
  try {
    const { name, ingredients, instructions } = req.body;
    const col = getCollection();
    const result = await col.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: { name, ingredients, instructions, updatedAt: new Date() } },
      { returnDocument: "after" }
    );
    if (!result.value) return res.status(404).json({ error: "Recipe not found." });
    res.json(result.value);
  } catch {
    res.status(400).json({ error: "Error updating recipe." });
  }
});

// DELETE /api/recipes/:id
router.delete("/:id", async (req, res) => {
  try {
    const col = getCollection();
    const result = await col.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Recipe not found." });
    res.json({ ok: true });
  } catch {
    res.status(400).json({ error: "Error deleting recipe." });
  }
});

module.exports = router;

