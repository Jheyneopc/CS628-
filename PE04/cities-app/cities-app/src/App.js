// App.js
import React, { useState } from "react";
import {
  Routes,
  Route,
  NavLink,
  Link,
  Navigate,
  useParams,
  useNavigate,
  Outlet,
} from "react-router-dom";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

const SEED = [
  { id: "seattle", name: "Seattle", country: "USA", population: 733919 },
  { id: "vancouver", name: "Vancouver", country: "Canada", population: 662248 },
];

export default function App() {
  const [cities, setCities] = useState(SEED);

  const addCity = ({ name, country, population }) => {
    const id = slugify(name);

    const uniqueId = cities.some(c => c.id === id) ? `${id}-${Date.now()}` : id;

    setCities(prev => [
      ...prev,
      { id: uniqueId, name, country, population: Number(population) || 0 },
    ]);
  };

  return (
    <div style={styles.app}>
      <Header />

      <nav style={styles.nav}>
        <NavLink to="/cities" style={styles.link} end>
          Cities List
        </NavLink>
        <NavLink to="/add" style={styles.link}>
          Add City
        </NavLink>
      </nav>

      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<Navigate to="/cities" replace />} />

          {/* Cities page with nested details */}
          <Route path="cities" element={<CitiesPage cities={cities} />}>
            <Route index element={<EmptyState />} />
            <Route path=":id" element={<CityDetails cities={cities} />} />
          </Route>

          {/* Add city page (redirect back to /cities after submit) */}
          <Route path="add" element={<AddCity onAdd={addCity} />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}


function Header() {
  return (
    <header style={styles.header}>
      <h1 style={{ margin: 0 }}>Cities Application</h1>
    </header>
  );
}

function CitiesPage({ cities }) {
  return (
    <section style={styles.panel}>
      <h2>Cities List</h2>

      {cities.length === 0 ? (
        <p>No cities yet. Add one.</p>
      ) : (
        <ul style={styles.ul}>
          {cities.map((c) => (
            <li key={c.id}>
              <Link to={c.id} style={styles.cityLink}>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Nested route outlet: the city details render here */}
      <Outlet />
    </section>
  );
}

function CityDetails({ cities }) {
  const { id } = useParams();
  const city = cities.find((c) => c.id === id);

  if (!city) {
    return <p style={{ marginTop: 24 }}>City not found.</p>;
  }

  return (
    <article style={{ marginTop: 24 }}>
      <h3 style={{ marginBottom: 12 }}>{city.name} Details</h3>
      <p>
        <strong>Country:</strong> {city.country}
      </p>
      <p>
        <strong>Population:</strong> {city.population.toLocaleString()}
      </p>
    </article>
  );
}

function AddCity({ onAdd }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", country: "", population: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.country.trim()) return;
    onAdd(form);
    navigate("/cities"); // redirect after add
  };

  return (
    <section style={styles.panel}>
      <h2>Add City</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Name:
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>

        <label style={styles.label}>
          Country:
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>

        <label style={styles.label}>
          Population:
          <input
            name="population"
            value={form.population}
            onChange={handleChange}
            style={styles.input}
            inputMode="numeric"
            placeholder="e.g., 733919"
          />
        </label>

        <button type="submit" style={styles.button}>
          Add City
        </button>
      </form>
    </section>
  );
}

function EmptyState() {
  return (
    <p style={{ marginTop: 24, color: "#666" }}>
      Select a city to see its details.
    </p>
  );
}

function NotFound() {
  return (
    <section style={styles.panel}>
      <h2>Page Not Found</h2>
      <p>
        Go back to the{" "}
        <Link to="/cities" style={styles.cityLink}>
          Cities List
        </Link>
        .
      </p>
    </section>
  );
}

/* ================= tiny inline styles to keep things simple ================= */
const styles = {
  app: { fontFamily: "system-ui, Arial, sans-serif", color: "#111" },
  header: {
    background: "#2d2d2d",
    color: "#fff",
    padding: "18px 24px",
    textAlign: "center",
    fontWeight: 600,
  },
  nav: {
    display: "flex",
    gap: 16,
    padding: "12px 24px",
    background: "#f5f5f5",
    borderBottom: "1px solid #eee",
  },
  link: ({ isActive }) => ({
    color: isActive ? "#0a66c2" : "#333",
    textDecoration: "none",
    fontWeight: isActive ? 700 : 500,
  }),
  main: { padding: 24, maxWidth: 900, margin: "0 auto" },
  panel: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 8,
    padding: 20,
  },
  ul: { listStyle: "none", padding: 0, margin: "12px 0" },
  cityLink: { color: "#6a2bd8", textDecoration: "none" },
  form: { display: "grid", gap: 12, maxWidth: 420 },
  label: { display: "grid", gap: 6 },
  input: {
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: 6,
  },
  button: {
    marginTop: 8,
    padding: "10px 14px",
    border: "none",
    borderRadius: 6,
    background: "#0a66c2",
    color: "#fff",
    cursor: "pointer",
  },
};
