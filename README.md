# Naik Foods — Smart E-Commerce Enhancement

A MERN stack prototype demonstrating practical improvements to the [Naik Foods](https://www.naikfoods.co.in/in) e-commerce experience. Built as part of the **BITS AND VOLTS** Full Stack MERN Intern technical assignment.

## Live Demo

| Service | URL |
|---------|-----|
| **Frontend** | https://naik-foods-assignment.netlify.app/ |
| **Backend API** | https://naik-foods-assignment.onrender.com |

## Overview

After analyzing the Naik Foods website from both user and developer perspectives, I identified key opportunities in **product discovery**, **customer engagement**, and **post-purchase experience**. This prototype addresses those opportunities with a working MERN-stack implementation.

## What I Developed

### Product Discovery
- **Keyword Search** with autocomplete suggestions
- **Category Filtering** across 7 product categories
- **Price Range Filter** for budget-conscious shopping
- **Rating Filter** to find top-rated products
- **Smart Sorting** — by price, rating, or name

### Shopping Experience
- **Product Details** with full product information
- **Customer Reviews** with star ratings
- **"You May Also Like"** — dynamic recommendations based on category & tags
- **"Frequently Bought Together"** — complementary product suggestions
- **Recently Viewed Products** — easy return to previously browsed items
- **Delivery Pincode Checker** — check delivery availability before purchasing

### Cart & Checkout
- **Persistent Cart** — saved across sessions via localStorage
- **Quantity Management** — increment, decrement, remove
- **Free Delivery Progress Bar** — visual indicator for ₹999 threshold
- **Complete Checkout Flow** — address form, order summary, payment selection

### Customer Engagement
- **Wishlist** — save products for later (MongoDB-backed)
- **My Orders** — order history with visual status timeline
- **Order Details** — itemized products, address, payment, price breakdown
- **Account Page** — profile management, saved addresses, profile completion

### UI/UX
- **Responsive Design** — mobile, tablet, and desktop optimized
- **Tailwind CSS** — modern, consistent styling
- **Glassmorphism Navbar** — semi-transparent header
- **Micro-interactions** — hover effects, smooth transitions
- **Scroll to Top** — convenient navigation

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 (Vite) |
| Routing | React Router v7 |
| Styling | Tailwind CSS v3 |
| HTTP | Axios |
| State | React Context API + localStorage |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas + Mongoose |
| Frontend Hosting | Netlify |
| Backend Hosting | Render |

## Project Structure

```
naik-foods-assignment/
├── client/
│   └── src/
│       ├── components/       # Reusable UI components
│       ├── context/          # CartContext, WishlistContext
│       ├── pages/            # Route pages (Store, Cart, Orders, etc.)
│       └── services/         # Axios API client
├── server/
│   ├── config/               # MongoDB connection
│   ├── controllers/          # Business logic
│   ├── models/               # Mongoose schemas
│   ├── routes/               # Express route definitions
│   ├── seed.js               # Database seeder
│   └── server.js             # Express entry point
└── README.md
```

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

Create `server/.env`:
```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
```

Seed the database and start the server:
```bash
node seed.js
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:
```bash
npm run dev
```

## API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get products (search, filter, sort, paginate) |
| `GET` | `/api/products/:id` | Get product by ID |
| `GET` | `/api/products/recommendations/:id` | Get recommendations |

### Wishlist
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/wishlist/:clientId` | Get wishlist |
| `POST` | `/api/wishlist/:clientId/add` | Add to wishlist |
| `DELETE` | `/api/wishlist/:clientId/remove/:productId` | Remove from wishlist |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/orders` | Create order |
| `GET` | `/api/orders/:clientId` | Get user's orders |
| `GET` | `/api/orders/detail/:id` | Get order details |

## Analysis Report

See [Naik_Foods_Analysis_Report.md](./Naik_Foods_Analysis_Report.md) for the complete website analysis, findings, and recommendations.

## Disclaimer

This project was developed as a technical assignment to demonstrate MERN stack development, responsive design, and e-commerce UX improvements. It is not affiliated with Naik Foods.
