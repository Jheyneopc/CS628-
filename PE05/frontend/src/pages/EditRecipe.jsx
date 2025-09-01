import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";

export default function EditRecipe() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", ingredients: "", instructions: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    api.getRecipe(id)
      .then((r) =>
        setForm({
          name: r.name || "",
          ingredients: r.ingredients || "",
          instructions: r.instructions || "",
        })
      )
      .catch((e) => setError(e.message));
  }, [id]);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await api.updateRecipe(id, form);
      nav(`/recipes/${id}`);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <h2>Edit Recipe</h2>
      {error && <p className="error">{error}</p>}

      <label>
        Name
        <input name="name" value={form.name} onChange={onChange} required />
      </label>

      <label>
        Ingredients
        <textarea name="ingredients" rows={6} value={form.ingredients} onChange={onChange} />
      </label>

      <label>
        Instructions
        <textarea name="instructions" rows={8} value={form.instructions} onChange={onChange} />
      </label>

      <button type="submit">Update</button>
    </form>
  );
}
