# Naik Foods - Smart E-Commerce Experience

A MERN stack e-commerce prototype inspired by the Naik Foods website.

The project focuses on improving product discovery and shopping experience through
search, filtering, product details, recommendations, frequently bought together
products, cart management, and free-delivery progress tracking.

## Live Demo

Frontend:
https://naik-foods-assignment.netlify.app/

Backend:
https://naik-foods-assignment.onrender.com

## GitHub Repository

https://github.com/DineshSivalanka/naik-foods-assignment

## Features

- Product listing
- Product search
- Category filtering
- Price filtering
- Rating filtering
- Product sorting
- Product details page
- Add to cart
- Increase/decrease quantity
- Remove from cart
- Persistent cart using localStorage
- Free delivery progress indicator
- Smart product recommendations
- Frequently Bought Together section
- Loading state
- Empty search state
- API error state with retry
- Responsive mobile design

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Deployment

- Netlify - Frontend
- Render - Backend
- MongoDB Atlas - Database

## Project Structure

naik-foods-assignment/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── context/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   └── server.js
│
├── README.md
└── .gitignore

## Installation

### 1. Clone the repository

git clone https://github.com/DineshSivalanka/naik-foods-assignment.git

cd naik-foods-assignment

### 2. Install backend dependencies

cd server

npm install

### 3. Configure backend environment variables

Create:

server/.env

Add:

PORT=5000
MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>

### 4. Start backend

npm start

The backend will run on:

http://localhost:5000

### 5. Install frontend dependencies

Open another terminal:

cd client

npm install

### 6. Configure frontend environment

Create:

client/.env

Add:

VITE_API_URL=http://localhost:5000/api

### 7. Start frontend

npm run dev

The frontend will run on:

http://localhost:5173

## API Endpoints

### Get Products

GET /api/products

### Search and Filter Products

GET /api/products?search=pickle

GET /api/products?category=Snacks

GET /api/products?minPrice=100&maxPrice=500

GET /api/products?minRating=4

### Get Product

GET /api/products/:id

### Get Recommendations

GET /api/products/recommendations/:id

## Key Implementation

### Smart Recommendations

Products are recommended using:

- Same category
- Matching product tags
- Rating
- Number of reviews

The recommendation API returns relevant products for the selected product.

### Cart

The cart is managed using React Context API.

Cart data is persisted using browser localStorage, allowing products to remain
in the cart after page refresh.

### Free Delivery

The application tracks the cart value and displays progress toward the
₹999 free-delivery threshold.

### Error Handling

The application provides:

- Loading state
- Empty result state
- API error state
- Retry functionality

## Improvements Identified from Website Analysis

The original website provides a strong foundation, but the following areas can
further improve the shopping experience:

1. Advanced product filtering
2. Product-level reviews and ratings
3. Frequently Bought Together recommendations
4. Personalized product recommendations
5. Better delivery-date visibility
6. Stronger product information such as ingredients and nutrition
7. Improved mobile shopping experience
8. SEO-focused category and product landing pages
9. Performance optimization
10. Better analytics for search, cart, and checkout behavior

## Future Enhancements

- User authentication
- Wishlist
- Product reviews
- Order tracking
- Pincode-based delivery checking
- Payment gateway integration
- Personalized recommendations
- AI-powered natural language product search
- Frequently bought bundle discounts
- Loyalty and rewards system

## Screenshots

Add screenshots of:

- Home page
- Store page
- Search and filters
- Product details
- Recommendations
- Cart
- Mobile responsive view

## Disclaimer

This project was developed as a technical assignment/prototype to demonstrate
MERN stack development, product thinking, UX improvements, and e-commerce
functionality.
