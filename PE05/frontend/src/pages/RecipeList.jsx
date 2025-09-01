import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.listRecipes()
      .then(setRecipes)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <section>
      <h2>All Recipes</h2>
      {error && <p className="error">{error}</p>}
      {recipes.length === 0 && !error && <p>No recipes yet.</p>}
      <ul className="list">
        {recipes.map((r) => (
          <li key={r._id}>
            <Link to={`/recipes/${r._id}`}>{r.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
