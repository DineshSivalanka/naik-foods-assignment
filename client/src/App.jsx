import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Store from "./pages/Store";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";

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
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
