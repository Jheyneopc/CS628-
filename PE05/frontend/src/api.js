// frontend/src/api.js

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }
  // Some responses (like DELETE) may not return JSON
  try { 
    return await res.json(); 
  } catch { 
    return {}; 
  }
}

export const api = {
  listRecipes: () => request("/recipes"),
  getRecipe: (id) => request(`/recipes/${id}`),
  createRecipe: (data) =>
    request("/recipes", { method: "POST", body: JSON.stringify(data) }),
  updateRecipe: (id, data) =>
    request(`/recipes/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteRecipe: (id) => request(`/recipes/${id}`, { method: "DELETE" }),
};
