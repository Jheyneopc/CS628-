import { Routes, Route, NavLink } from "react-router-dom";
import RecipeList from "./pages/RecipeList.jsx";
import RecipeDetails from "./pages/RecipeDetails.jsx";
import AddRecipe from "./pages/AddRecipe.jsx";
import EditRecipe from "./pages/EditRecipe.jsx";

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>Recipe Finder</h1>
        <nav>
          <NavLink to="/recipes">Recipes</NavLink>
          <NavLink to="/add">Add Recipe</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/edit/:id" element={<EditRecipe />} />
      </Routes>
    </div>
  );
}
