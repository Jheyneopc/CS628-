import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function AddRecipe() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", ingredients: "", instructions: "" });
  const [error, setError] = useState("");

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const created = await api.createRecipe(form);
      nav(`/recipes/${created._id}`);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <h2>Add Recipe</h2>
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

      <button type="submit">Save</button>
    </form>
  );
}
