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
    <div className="flex flex-col md:flex-row items-center justify-between px-5 md:px-[8%] py-10 md:py-[60px] min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#fffbf7] to-white gap-8 md:gap-10 text-center md:text-left">
      <div className="flex-1 max-w-[600px]">
        <h1 className="text-[42px] md:text-[56px] leading-[1.1] text-gray-900 mb-5 font-extrabold tracking-tight">
          Authentic Maharashtrian <br/><span className="text-primary">Flavors, Delivered</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
          Traditional snacks, pickles, and delicious treats crafted with love and heritage.
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-stretch md:items-center">
          <Link to="/store" className="bg-primary hover:bg-[#c2410c] text-white px-8 py-4 rounded-lg font-semibold text-base shadow-[0_8px_20px_rgba(234,88,12,0.25)] hover:shadow-[0_12px_25px_rgba(234,88,12,0.35)] hover:-translate-y-0.5 transition-all duration-200 inline-block text-center">
            Shop Now
          </Link>
          <Link to="/store?category=Snacks" className="bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-primary hover:text-primary px-8 py-3.5 rounded-lg font-semibold text-base transition-all duration-200 inline-block text-center">
            Explore Categories
          </Link>
        </div>
      </div>
      
      <div className="flex-1 flex justify-center md:justify-end relative w-full mt-10 md:mt-0">
        <div className="absolute w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-orange-100 rounded-full blur-[40px] top-[10%] md:right-[10%] z-0"></div>
        <img 
          src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=1000&auto=format&fit=crop" 
          alt="Authentic Maharashtrian Food" 
          className="w-full max-w-[500px] object-cover rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] z-10 relative"
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
