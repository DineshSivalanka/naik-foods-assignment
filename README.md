# Naik Foods - Smart E-Commerce Experience

A modern MERN stack e-commerce prototype designed to deliver a premium, high-performance shopping experience.

This project focuses on improving product discovery, shopping experience, and responsive design through features like advanced search, category filtering, persistent cart management, custom pagination, and a complete UI uplift using Tailwind CSS.

## Live Demo

Frontend: https://naik-foods-assignment.netlify.app/
Backend: https://naik-foods-assignment.onrender.com

## GitHub Repository

https://github.com/DineshSivalanka/naik-foods-assignment

## 🌟 Key Features

### 🛍️ Core E-Commerce
- **Product Listing:** Displaying 100 seeded products across various categories (Snacks, Pickles, Spices, Sweets).
- **Custom Pagination:** Client-side pagination limiting the view to 20 items (4-5 rows) per page for optimal performance.
- **Advanced Filtering:** Category, price range, and rating filters.
- **Persistent Cart:** Context-based cart state persisted via `localStorage`.
- **Free Delivery Tracker:** Progress bar tracking the ₹999 free-delivery threshold.

### 🎨 Premium UI/UX (Tailwind CSS)
- **Responsive Mobile-First Design:** Fully optimized for mobile (375px), tablet, and desktop viewports.
- **Glassmorphism:** Advanced blurry, semi-transparent header nav that looks great over scrolling content.
- **Micro-Interactions:** Smooth hover physics on product cards, bouncing buttons, and custom glow effects.
- **Modern Typography & Colors:** High-contrast Slate text and vibrant Orange accents.

## Tech Stack

### Frontend
- React.js (Vite)
- React Router v7
- Tailwind CSS v3
- Axios

### Backend
- Node.js & Express.js
- MongoDB & Mongoose

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/DineshSivalanka/naik-foods-assignment.git
cd naik-foods-assignment
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `server/.env` file:
```env
PORT=5000
MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>
```
Start the backend server and run the seed script to populate 100 products:
```bash
node seed.js
npm start
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```
Create a `client/.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
```

## API Endpoints

- `GET /api/products` - Get all products with pagination & search.
- `GET /api/products?category=Snacks` - Filter by category.
- `GET /api/products/:id` - Get single product details.
- `POST /api/orders` - Create a new order.

## Disclaimer

This project was developed as a technical assignment/prototype to demonstrate MERN stack development, responsive design patterns, and e-commerce UI/UX improvements.
