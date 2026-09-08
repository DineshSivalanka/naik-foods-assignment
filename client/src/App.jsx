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
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Naik Foods</h1>
      <p>
        Discover traditional flavors and delicious
        products.
      </p>

      <a href="/store" className="shop-button">
        Explore Products
      </a>
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
        </Routes>
      </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
