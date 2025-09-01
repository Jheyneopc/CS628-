// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("./db");
const recipeRoutes = require("./routes/recipes");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Recipe Finder API is running.");
});

app.use("/api/recipes", recipeRoutes);

const PORT = process.env.PORT || 4000;

connect()
  .then(() => {
    app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Falha ao conectar no MongoDB:", err.message);
    process.exit(1);
  });
