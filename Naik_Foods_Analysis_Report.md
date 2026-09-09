# Naik Foods — Website UX & Technical Analysis Report

**Submitted by:** Dinesh Sivalanka  
**Assignment:** Full Stack MERN Intern — Technical Task  
**Company:** BITS AND VOLTS PRIVATE LIMITED  
**Date:** September 2026  
**Website Studied:** https://www.naikfoods.co.in/in  

---

**Live Prototype:** https://naik-foods-assignment.netlify.app/  
**Backend API:** https://naik-foods-assignment.onrender.com  
**GitHub Repository:** https://github.com/DineshSivalanka/naik-foods-assignment  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Website Overview](#2-website-overview)
3. [User Perspective Analysis](#3-user-perspective-analysis)
4. [Developer Perspective Analysis](#4-developer-perspective-analysis)
5. [Problems Identified](#5-problems-identified)
6. [Recommended Improvements](#6-recommended-improvements)
7. [New Feature Ideas](#7-new-feature-ideas)
8. [Feature Selected for Development](#8-feature-selected-for-development)
9. [Technical Implementation](#9-technical-implementation)
10. [API Documentation](#10-api-documentation)
11. [Expected Impact](#11-expected-impact)
12. [Deployment](#12-deployment)
13. [Conclusion](#13-conclusion)

---

## 1. Executive Summary

Naik Foods (https://www.naikfoods.co.in/in) is an e-commerce platform specializing in authentic Maharashtrian food products from the Vidarbha and Konkan regions. The website is built with Next.js, uses Medusa as the commerce backend, Cloudinary for image hosting, and Razorpay for payment processing. It offers 115+ products across 8 categories.

After thorough analysis from both user and developer perspectives, I identified several opportunities for improvement in **product discovery**, **shopping experience**, **customer engagement**, and **order management**. Based on these findings, I developed a working MERN-stack prototype that addresses the most impactful improvements.

---

## 2. Website Overview

### Existing Pages
| Page | URL | Purpose |
|------|-----|---------|
| Home | `/in` | Brand hero, featured categories, trust badges |
| About | `/in/about` | Brand story, founder info, family legacy since 1938 |
| Store | `/in/store` | Product catalog with 115 products, pagination |
| Product Detail | `/in/products/[slug]` | Product info, images, add to cart |
| Blog | `/in/blog` | 5 articles on Maharashtrian food |
| Contact | `/in/contact` | Contact form, Google Maps, phone/email |
| Cart | `/in/cart` | Shopping cart |

### Product Categories
| Category | Products |
|----------|----------|
| Snacks and Namkeen | Khakhra, Noodles, Chivda |
| Pickles & Condiments | Mango pickle, Lemon pickle |
| Sweets & Bakery | Chirote, Cream Roll, Cookies |
| Dairy & Beverages | Lassi, Buttermilk |
| Mukhvas & Digestives | Mukhwas varieties |
| Confectionery | Bakery items |
| Spices & Masalas | Garam Masala, Turmeric |
| Dry/Instant Grocery | Papad, Instant mixes |

### Technology Stack (Original Website)
- **Frontend:** Next.js (React)
- **Commerce Backend:** Medusa.js
- **Image CDN:** Cloudinary
- **Payment Gateway:** Razorpay
- **Deployment:** Vercel (likely)

---

## 3. User Perspective Analysis

### 3.1 Product Discovery

**Observation:** The store page displays 12 products per page across 10 pages (115 products). Categories are available as horizontal cards at the top. A basic sort dropdown and region filter (Pune, Vidarbha, Konkan, Nashik) exist.

**Friction Point:** There is no search bar on the store page. A customer looking for a specific product (e.g., "mango pickle") must browse through pages manually. With 115 products across 10 pages, this can lead to drop-off.

**Recommendation:** Add keyword search with autocomplete suggestions, combine with category filters, price range filters, and rating-based sorting. This reduces product discovery time from several page clicks to a single search query.

### 3.2 Navigation & Information Architecture

**Observation:** The header navigation has 5 items: Home, About, Shop, Blogs, Contact. The cart count badge is present.

**Friction Point:** There is no visible link to Wishlist, Account, or Orders from the main navigation. Users cannot save products for later or quickly access their order history.

**Recommendation:** Add Wishlist (with heart icon and count badge) and Account/Profile to the header navigation, consistent with modern e-commerce conventions.

### 3.3 Product Details Page

**Observation:** The product page shows product image with thumbnails, name, tags, price, weight, key features as bullet points, variant selector, quantity controls, delivery check input, description tab, and featured products section at the bottom.

**Friction Point:** There are no customer reviews or ratings visible. The "56 Reviews" text appears but no actual reviews are shown. There is no "Related Products" section based on the current product's category. The "Featured Products" section at the bottom shows the same 4 products regardless of which product the user is viewing.

**Recommendation:** Add visible customer reviews with star ratings, implement dynamic "You May Also Like" recommendations based on the current product's category and tags, and add a "Frequently Bought Together" section to increase average order value.

### 3.4 Cart & Checkout Experience

**Observation:** The cart page exists and handles quantity changes. The website communicates a free delivery threshold of ₹999.

**Friction Point:** There is no visual progress indicator showing how close the customer is to the ₹999 free delivery threshold. This is a missed opportunity to encourage customers to add one more product.

**Recommendation:** Add a free delivery progress bar that shows: "Add ₹279 more for free delivery!" with a visual progress indicator. This is a proven technique to increase average order value.

### 3.5 Mobile Experience

**Observation:** The website is responsive and renders on mobile devices.

**Friction Point:** On smaller screens, the category cards on the store page require horizontal scrolling, and the filter options take significant vertical space. The product grid could be more space-efficient on mobile.

**Recommendation:** Implement a compact mobile filter with a slide-out filter panel, and optimize the product card layout for smaller viewports.

### 3.6 Post-Purchase Experience

**Observation:** After a customer places an order, there is no visible order history, order tracking, or order status page accessible from the website navigation.

**Friction Point:** Customers cannot track their order status, view past purchases, or reorder items. This reduces customer retention and repeat purchases.

**Recommendation:** Add an Orders page with order status timeline (Confirmed → Packed → Shipped → Delivered), order details page with itemized products, delivery address, payment information, and price breakdown. Add a "Reorder" button for repeat purchases.

---

## 4. Developer Perspective Analysis

### 4.1 Performance

**Observation:** The website uses Next.js with `_next/image` optimization, Cloudinary for image CDN, and server-side rendering.

**Opportunity:** Product images from Cloudinary could leverage more aggressive optimization parameters. Lazy loading for below-the-fold images and components would improve initial load time. Code splitting at the page level would reduce the initial JavaScript bundle.

### 4.2 SEO

**Observation:** The website has basic meta tags and uses semantic URLs (`/in/products/multi-millet-noodles`).

**Opportunity:** Product pages could include structured data (JSON-LD) for products, including price, availability, and reviews. This enables rich snippets in Google search results. Category pages could target long-tail keywords like "authentic Maharashtrian snacks online" or "Konkan food products Pune."

### 4.3 Accessibility

**Opportunity:** Form inputs should have associated labels. Interactive elements need visible focus states for keyboard navigation. Image alt text should be descriptive rather than generic. Color contrast should meet WCAG AA standards across all text.

### 4.4 Error Handling

**Observation:** Some products show ₹0 price (e.g., "Aaswad Mitha Paan" at ₹0, "Shahi Mukhwas" at ₹0).

**Recommendation:** Add validation to prevent products with ₹0 price from being displayed as purchasable, or display them as "Coming Soon" / "Contact for Price."

### 4.5 API Architecture

**Observation:** The website uses Medusa.js as the commerce backend, which provides a comprehensive API for products, cart, and orders.

**Opportunity:** Product recommendation logic could be implemented as a separate microservice or API endpoint that considers browsing history, purchase history, and product relationships (same category, same tags, frequently bought together).

---

## 5. Problems Identified

| # | Problem | Area | Severity |
|---|---------|------|----------|
| 1 | No search functionality on the store page | Product Discovery | 🔴 High |
| 2 | No advanced filters (price range, rating) | Product Discovery | 🔴 High |
| 3 | No customer reviews visible on product pages | Trust & Conversion | 🔴 High |
| 4 | No wishlist functionality | Customer Engagement | 🟠 Medium |
| 5 | No order history or tracking | Post-Purchase | 🔴 High |
| 6 | No product recommendations based on current product | Revenue | 🟠 Medium |
| 7 | No free delivery progress indicator in cart | Revenue | 🟠 Medium |
| 8 | Featured products section is static, not personalized | Engagement | 🟠 Medium |
| 9 | Some products display ₹0 price | Data Quality | 🟡 Low |
| 10 | No recently viewed products section | Engagement | 🟡 Low |

---

## 6. Recommended Improvements

### Finding 01 — Product Discovery Enhancement

**Problem:** Customers must manually browse through 10 pages (115 products) to find specific products. No search bar or advanced filtering exists on the store page.

**Recommendation:** Introduce keyword search with autocomplete, category filtering, price range filtering, rating-based sorting, and sort options (price low-to-high, high-to-low, popularity, newest).

**Implementation:** Developed a complete product discovery module with search, multi-filter sidebar, and intelligent sorting using React and REST APIs.

**Expected Impact:** Reduced product discovery time, improved user satisfaction, and higher conversion rates.

**Priority:** 🔴 High

---

### Finding 02 — Customer Reviews & Social Proof

**Problem:** Product pages display "56 Reviews" text but no actual reviews are visible. Customers lack social proof before making purchase decisions.

**Recommendation:** Add a visible reviews section on product pages showing customer ratings, review text, reviewer name, and date. Allow sorting by most recent and most helpful.

**Implementation:** Built a ProductReviews component that displays customer reviews with star ratings on product detail pages.

**Expected Impact:** Increased customer confidence and improved conversion rates through social proof.

**Priority:** 🔴 High

---

### Finding 03 — Wishlist Functionality

**Problem:** There is no way for customers to save products for later. This is a standard e-commerce feature that supports purchase consideration and return visits.

**Recommendation:** Add wishlist functionality with a heart icon on product cards, a dedicated wishlist page, and persistent storage via MongoDB.

**Implementation:** Built complete wishlist system with backend API (MongoDB), context-based state management, and UI integration across product cards, product details, and a dedicated wishlist page.

**Expected Impact:** Increased customer engagement, return visits, and eventual conversion of saved items.

**Priority:** 🟠 Medium

---

### Finding 04 — Order Management

**Problem:** After placing an order, customers have no way to view order history, track order status, or access order details.

**Recommendation:** Add an Orders page with order status timeline, an Order Details page with itemized products, delivery address, payment summary, and price breakdown. Include Track Order and Reorder functionality.

**Implementation:** Built Orders page with visual status timeline (Confirmed → Packed → Shipped → Delivered), Order Details page with complete order information, and backend API for order creation and retrieval.

**Expected Impact:** Improved post-purchase experience, reduced customer support inquiries, and increased repeat purchases through Reorder functionality.

**Priority:** 🔴 High

---

### Finding 05 — Smart Product Recommendations

**Problem:** The "Featured Products" section on product pages shows the same 4 products regardless of which product the user is viewing. This misses an opportunity to cross-sell relevant products.

**Recommendation:** Implement dynamic recommendations based on the current product's category and tags. Add "You May Also Like" and "Frequently Bought Together" sections.

**Implementation:** Built a recommendation API that returns products matching the current product's category and tags, ranked by rating and reviews. Implemented "Frequently Bought Together" component showing complementary products.

**Expected Impact:** Increased average order value and product discovery.

**Priority:** 🟠 Medium

---

### Finding 06 — Free Delivery Progress

**Problem:** Naik Foods offers free delivery for orders above ₹999, but there is no visual indicator in the cart showing how close the customer is to this threshold.

**Recommendation:** Add a progress bar in the cart showing: "Add ₹X more for free delivery!" with a visual fill indicator.

**Implementation:** Built a free delivery progress bar component in the cart page that dynamically calculates the remaining amount needed for the ₹999 threshold.

**Expected Impact:** Encouraged customers to add more items to reach the free delivery threshold, increasing average order value.

**Priority:** 🟠 Medium

---

### Finding 07 — Account & Profile Management

**Problem:** No user account page exists for managing personal information, saved addresses, or viewing activity summary.

**Recommendation:** Add an Account page with profile information, saved addresses for faster checkout, profile completion indicator, and navigation to orders and wishlist.

**Implementation:** Built Account page with profile management, saved addresses section, profile completion progress indicator, and sidebar navigation.

**Expected Impact:** Improved personalization and faster checkout through saved addresses.

**Priority:** 🟡 Low

---

## 7. New Feature Ideas

### 7.1 Recently Viewed Products
Track and display the last 5-10 products a customer has viewed. This helps customers quickly return to products they were considering.

**Implementation Status:** ✅ Built — RecentlyViewed component using localStorage.

### 7.2 Autocomplete Search
As the customer types, suggest matching product names and categories. This reduces search friction and helps customers discover products they may not have known existed.

**Implementation Status:** ✅ Built — AutocompleteSearch component with debounced API calls.

### 7.3 Delivery Pincode Checker
Allow customers to enter their pincode on product pages to check delivery availability and estimated delivery time before adding to cart.

**Implementation Status:** ✅ Built — DeliveryCheck component on product detail pages.

### 7.4 Checkout Flow
Complete checkout with delivery address, order summary, payment selection, and order confirmation.

**Implementation Status:** ✅ Built — Full checkout page with address form, order summary, and order placement.

### 7.5 WhatsApp Order Support
Add a floating WhatsApp button that allows customers to directly contact the business for order support, bulk orders, or inquiries.

### 7.6 Product Bundles
Create curated bundles like "Maharashtrian Snack Box" or "Festival Sweets Pack" that offer a small discount over individual purchases.

### 7.7 Loyalty / Rewards Program
Introduce a points-based system where customers earn points on purchases, redeemable for discounts on future orders.

---

## 8. Feature Selected for Development

### Smart E-Commerce Enhancement Prototype

Instead of rebuilding the entire Naik Foods website, I developed a focused MERN-stack prototype that demonstrates practical improvements to the existing shopping experience. The prototype addresses the highest-impact findings from my analysis.

### Features Developed & UI Enhancements

Instead of just recreating the existing site, the prototype introduces several **net-new features and UX improvements**:

**Core E-Commerce Features (New / Improved vs Original)**
| # | Feature | Status |
|---|---------|--------|
| 1 | Keyword search with autocomplete | ✅ Implemented |
| 2 | Advanced filtering (Category, price range, and rating) | ✅ Implemented |
| 3 | Product sorting (price, rating, name) | ✅ Implemented |
| 4 | Customer reviews section with star ratings | ✅ Implemented |
| 5 | "You May Also Like" dynamic recommendations | ✅ Implemented |
| 6 | "Frequently Bought Together" section | ✅ Implemented |
| 7 | Recently viewed products tracking | ✅ Implemented |
| 8 | Free delivery progress bar (₹999 visual indicator) | ✅ Implemented |
| 9 | Delivery pincode checker | ✅ Implemented |
| 10 | Wishlist functionality with MongoDB backend | ✅ Implemented |

**Account & Order Management (New Features)**
| # | Feature | Status |
|---|---------|--------|
| 11 | My Orders page with visual status timeline (Confirmed → Packed → Shipped → Delivered) | ✅ Implemented |
| 12 | Order Details page with itemized breakdown, address, and payment info | ✅ Implemented |
| 13 | "Reorder" functionality for quick repeat purchases | ✅ Implemented |
| 14 | Account / Profile page with profile completion progress indicator | ✅ Implemented |
| 15 | Saved Addresses management with actionable empty states | ✅ Implemented |

**UI/UX Improvements**
| # | Feature | Status |
|---|---------|--------|
| 16 | Consistent iconography using Lucide React icons | ✅ Implemented |
| 17 | Responsive mobile design with optimized layouts | ✅ Implemented |
| 18 | Glassmorphism semi-transparent navbar | ✅ Implemented |
| 19 | Micro-interactions (hover physics, custom glows) | ✅ Implemented |
| 20 | Persistent cart (localStorage) & Custom pagination | ✅ Implemented |

---

## 9. Technical Implementation

### 9.1 Architecture

```
User (Browser)
     │
     ▼
React Frontend (Vite)
     │  Axios / REST API
     ▼
Express.js Backend (Node.js)
     │  Mongoose ODM
     ▼
MongoDB Atlas (Cloud Database)
```

### 9.2 Project Structure

```
naik-foods-assignment/
│
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── AutocompleteSearch.jsx   # Search with suggestions
│   │   │   ├── DeliveryCheck.jsx        # Pincode delivery checker
│   │   │   ├── FilterBar.jsx            # Category, price, rating filters
│   │   │   ├── Footer.jsx               # Site footer
│   │   │   ├── FrequentlyBought.jsx     # Frequently bought together
│   │   │   ├── Navbar.jsx               # Navigation with cart/wishlist badges
│   │   │   ├── ProductCard.jsx          # Product card with wishlist toggle
│   │   │   ├── ProductReviews.jsx       # Customer reviews section
│   │   │   ├── RecentlyViewed.jsx       # Recently viewed products
│   │   │   ├── Recommendations.jsx      # You May Also Like section
│   │   │   └── ScrollToTop.jsx          # Scroll to top button
│   │   │
│   │   ├── context/
│   │   │   ├── CartContext.jsx          # Cart state (localStorage)
│   │   │   └── WishlistContext.jsx      # Wishlist state (MongoDB)
│   │   │
│   │   ├── pages/
│   │   │   ├── Store.jsx                # Product listing + filters
│   │   │   ├── ProductDetails.jsx       # Product info + recommendations
│   │   │   ├── Cart.jsx                 # Cart + free delivery progress
│   │   │   ├── Checkout.jsx             # Checkout flow
│   │   │   ├── Wishlist.jsx             # Saved products
│   │   │   ├── Orders.jsx               # Order history + status timeline
│   │   │   ├── OrderDetails.jsx         # Full order details
│   │   │   ├── Account.jsx              # Profile management
│   │   │   ├── About.jsx                # About page
│   │   │   ├── Blog.jsx                 # Blog page
│   │   │   └── Contact.jsx              # Contact page
│   │   │
│   │   ├── services/
│   │   │   └── api.js                   # Axios API client
│   │   │
│   │   ├── App.jsx                      # Routes & providers
│   │   └── main.jsx                     # Entry point
│   │
│   └── package.json
│
├── server/                          # Node.js Backend
│   ├── config/
│   │   └── db.js                        # MongoDB connection
│   │
│   ├── controllers/
│   │   ├── productController.js         # Product CRUD + recommendations
│   │   ├── wishlistController.js        # Wishlist CRUD
│   │   └── orderController.js           # Order CRUD
│   │
│   ├── models/
│   │   ├── Product.js                   # Product schema
│   │   ├── Wishlist.js                  # Wishlist schema
│   │   └── Order.js                     # Order schema
│   │
│   ├── routes/
│   │   ├── productRoutes.js             # Product API routes
│   │   ├── wishlistRoutes.js            # Wishlist API routes
│   │   └── orderRoutes.js               # Order API routes
│   │
│   ├── seed.js                          # Database seeder (38 products)
│   ├── server.js                        # Express app entry
│   └── package.json
│
├── README.md
└── .gitignore
```

### 9.3 Technologies Used

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 | UI components |
| Build Tool | Vite | Fast development & build |
| Routing | React Router v7 | Client-side routing |
| Styling | Tailwind CSS v3 | Utility-first responsive CSS |
| HTTP Client | Axios | API communication |
| State Management | React Context API | Cart & wishlist state |
| Persistence | localStorage | Cart data persistence |
| Backend | Node.js + Express.js | REST API server |
| Database | MongoDB Atlas + Mongoose | Data storage & ODM |
| Frontend Hosting | Netlify | Static site deployment |
| Backend Hosting | Render | Node.js server deployment |

### 9.4 MongoDB Schemas

**Product Schema**
```javascript
{
  name: String,
  description: String,
  category: String,          // "Snacks & Namkeen", "Pickles & Condiments", etc.
  price: Number,
  originalPrice: Number,
  rating: Number,
  reviews: Number,
  weight: String,
  image: String,
  tags: [String],            // ["snacks", "spicy", "namkeen"]
  stock: Number,
  featured: Boolean
}
```

**Order Schema**
```javascript
{
  clientId: String,
  orderNumber: String,       // "NF10XXX"
  items: [{
    product: ObjectId (ref: Product),
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  total: Number,
  status: String,            // "Confirmed", "Packed", "Shipped", "Delivered"
  address: {
    name, phone, address, city, state, pincode
  },
  paymentMethod: String
}
```

**Wishlist Schema**
```javascript
{
  clientId: String,
  products: [ObjectId (ref: Product)]
}
```

---

## 10. API Documentation

### Products API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products (with search, filter, sort, pagination) |
| `GET` | `/api/products/:id` | Get single product by ID |
| `GET` | `/api/products/recommendations/:id` | Get product recommendations |

**Query Parameters for `/api/products`:**
- `search` — Keyword search (name, description, tags)
- `category` — Filter by category
- `minPrice`, `maxPrice` — Price range filter
- `minRating` — Minimum rating filter
- `sort` — Sort field (price, -price, rating, name)
- `page`, `limit` — Pagination

### Wishlist API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/wishlist/:clientId` | Get user's wishlist |
| `POST` | `/api/wishlist/:clientId/add` | Add product to wishlist |
| `DELETE` | `/api/wishlist/:clientId/remove/:productId` | Remove from wishlist |

### Orders API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/orders` | Create a new order |
| `GET` | `/api/orders/:clientId` | Get user's orders |
| `GET` | `/api/orders/detail/:id` | Get order details by ID |

---

## 11. Expected Impact

| Improvement | Expected Business Impact |
|-------------|-------------------------|
| Search + Filters | Faster product discovery → Higher conversion |
| Product Recommendations | Cross-selling → Higher average order value |
| Frequently Bought Together | Bundle suggestions → +15-25% AOV (industry average) |
| Free Delivery Progress | Encourages adding products → Increased cart value |
| Wishlist | Saves intent → Return visits → Delayed conversion |
| Customer Reviews | Social proof → Increased trust → Higher conversion |
| Order Tracking | Reduced support inquiries → Better customer experience |
| Recently Viewed | Easier re-discovery → Reduced bounce rate |
| Mobile Responsive | Better mobile experience → Captures mobile traffic |

---

## 12. Deployment

### Live URLs

| Service | URL |
|---------|-----|
| **Frontend (Netlify)** | https://naik-foods-assignment.netlify.app/ |
| **Backend API (Render)** | https://naik-foods-assignment.onrender.com |
| **GitHub Repository** | https://github.com/DineshSivalanka/naik-foods-assignment |

### Setup & Installation

```bash
# 1. Clone the repository
git clone https://github.com/DineshSivalanka/naik-foods-assignment.git
cd naik-foods-assignment

# 2. Backend setup
cd server
npm install

# Create server/.env
# PORT=5000
# MONGO_URI=<your-mongodb-connection-string>

# Seed the database
node seed.js

# Start the server
npm run dev

# 3. Frontend setup (new terminal)
cd ../client
npm install

# Create client/.env
# VITE_API_URL=http://localhost:5000/api

# Start the frontend
npm run dev
```

---

## 13. Conclusion

The Naik Foods website provides a strong foundation for selling authentic Maharashtrian food products online. The brand story is compelling, the product catalog is extensive (115+ products), and the visual design is clean.

The primary opportunity is not adding more pages, but **helping customers discover the right products faster and encouraging them to purchase more**. This is where the developed prototype focuses.

### What was built:
- **Advanced product discovery** — Search, filters, sorting
- **Smart recommendations** — "You May Also Like" + "Frequently Bought Together"
- **Complete shopping flow** — Cart → Checkout → Order Confirmation
- **Post-purchase experience** — Order history, order tracking, order details
- **Customer engagement** — Wishlist, reviews, recently viewed, account management
- **Revenue optimization** — Free delivery progress bar

### What this demonstrates:
- Full-stack MERN development (React + Node.js + Express + MongoDB)
- REST API design and implementation
- State management with Context API
- Responsive design with Tailwind CSS
- E-commerce UX best practices
- Product thinking and analytical approach
- Practical problem-solving

The prototype is a focused, working solution that addresses the most impactful improvements identified during the analysis — not a surface-level copy of the existing website, but a thoughtful enhancement that could meaningfully improve the customer experience and business outcomes.

---

## 14. Prototype Screens

*(Instructions: Take screenshots of your running prototype and insert them into the blank spaces below before converting this document to a PDF.)*

### 14.1 Advanced Product Discovery (Store Page)
*(Capture the store page showing the keyword search bar, category filters, and rating filters in action.)*

<br>
<br>
<div style="border: 2px dashed #ccc; padding: 100px; text-align: center; color: #888; margin-bottom: 20px;">
  [ INSERT SCREENSHOT HERE: Store page with Search and Filters visible ]
</div>
<br>
<br>

### 14.2 Product Details & Recommendations
*(Capture the product details page showing the product information along with the customer reviews and the "You May Also Like" / "Frequently Bought Together" sections.)*

<br>
<br>
<div style="border: 2px dashed #ccc; padding: 100px; text-align: center; color: #888; margin-bottom: 20px;">
  [ INSERT SCREENSHOT HERE: Product Details showing Reviews and Recommendations ]
</div>
<br>
<br>

### 14.3 Cart & Free Delivery Progress
*(Capture the cart page highlighting the persistent cart items, quantity management, and specifically the Free Delivery Progress bar.)*

<br>
<br>
<div style="border: 2px dashed #ccc; padding: 100px; text-align: center; color: #888; margin-bottom: 20px;">
  [ INSERT SCREENSHOT HERE: Cart page showing Free Delivery Progress Bar ]
</div>
<br>
<br>

### 14.4 Wishlist Functionality
*(Capture the Wishlist page showing saved products with the Lucide React heart icons.)*

<br>
<br>
<div style="border: 2px dashed #ccc; padding: 100px; text-align: center; color: #888; margin-bottom: 20px;">
  [ INSERT SCREENSHOT HERE: Wishlist page showing saved items ]
</div>
<br>
<br>

### 14.5 Post-Purchase: My Orders Timeline
*(Capture the My Orders page clearly showing the visual status timeline: Confirmed → Packed → Shipped → Delivered.)*

<br>
<br>
<div style="border: 2px dashed #ccc; padding: 100px; text-align: center; color: #888; margin-bottom: 20px;">
  [ INSERT SCREENSHOT HERE: My Orders page showing the order status timeline ]
</div>
<br>
<br>

### 14.6 Post-Purchase: Order Details & Reorder
*(Capture the Order Details page showing the itemized breakdown, delivery address, and the "Reorder" button.)*

<br>
<br>
<div style="border: 2px dashed #ccc; padding: 100px; text-align: center; color: #888; margin-bottom: 20px;">
  [ INSERT SCREENSHOT HERE: Order Details page with Reorder button ]
</div>
<br>
<br>

### 14.7 Account & Profile Completion
*(Capture the Account page showcasing the profile completion progress bar and the actionable saved addresses section.)*

<br>
<br>
<div style="border: 2px dashed #ccc; padding: 100px; text-align: center; color: #888; margin-bottom: 20px;">
  [ INSERT SCREENSHOT HERE: Account page showing Profile Completion indicator ]
</div>
<br>
<br>
