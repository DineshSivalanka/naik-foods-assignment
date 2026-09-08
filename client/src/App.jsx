import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Store from "./pages/Store";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home hero-container">
      <div className="hero-text">
        <h1>
          Authentic Maharashtrian <br/><span className="highlight-text">Flavors, Delivered</span>
        </h1>
        <p>
          Traditional snacks, pickles, and delicious treats crafted with love and heritage.
        </p>
        <div className="hero-buttons">
          <Link to="/store" className="shop-button primary-btn">
            Shop Now
          </Link>
          <Link to="/store?category=Snacks" className="explore-button secondary-btn">
            Explore Categories
          </Link>
        </div>
      </div>
      
      <div className="hero-image">
        <div className="hero-glow"></div>
        <img 
          src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=1000&auto=format&fit=crop" 
          alt="Authentic Maharashtrian Food" 
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route
            path="/wishlist"
            element={<Wishlist />}
          />
          <Route
            path="/checkout"
            element={<Checkout />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/blog"
            element={<Blog />}
          />
          <Route
            path="/contact"
            element={<Contact />}
          />
          <Route
            path="/account"
            element={<Account />}
          />
          <Route
            path="/orders"
            element={<Orders />}
          />
        </Routes>
      </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
