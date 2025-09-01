// backend/db.js
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "recipe_finder";

let client;
let db;

async function connect() {
  if (db) return db;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  return db;
}

function getCollection() {
  if (!db) throw new Error("DB not initialized. Call connect() first.");
  return db.collection("recipes");
}

module.exports = { connect, getCollection };
