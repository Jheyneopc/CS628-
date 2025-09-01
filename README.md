PE05
CS628 – PE05: Recipe Finder 
Quick Start
# Backend
cd PE05/backend
npm install
node server.js # http://localhost:4000
# Frontend 
cd PE05/frontend
npm install
npm run dev # http://localhost:5173
Environment Variable (frontend/.env)
VITE_API_URL=http://localhost:4000/api
API Endpoints
GET /api/recipes
GET /api/recipes/:id
POST /api/recipes
PUT /api/recipes/:id
DELETE /api/recipes/:id
Minimal Structure
PE05/
backend/ (Express + MongoDB)
frontend/ (React + Vite)

**Personal Note**

I really enjoyed building this Recipe Finder application. Beyond the scope of this assignment, I plan to continue improving it for personal use, adding features such as recipe categories, images, and user authentication.
