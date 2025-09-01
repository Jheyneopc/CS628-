import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api";

export default function RecipeDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getRecipe(id)
      .then(setRecipe)
      .catch((e) => setError(e.message));
  }, [id]);

  async function onDelete() {
    if (!confirm("Delete this recipe?")) return;
    try {
      await api.deleteRecipe(id);
      nav("/recipes");
    } catch (e) {
      setError(e.message);
    }
  }

  if (error) return <p className="error">{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <section>
      <h2>{recipe.name}</h2>

      <p><strong>Ingredients:</strong></p>
      <pre>{recipe.ingredients || "-"}</pre>

      <p><strong>Instructions:</strong></p>
      <pre>{recipe.instructions || "-"}</pre>

      <div className="actions">
        <Link to={`/edit/${recipe._id}`}>Edit</Link>
        <button onClick={onDelete}>Delete</button>
      </div>
    </section>
  );
}
