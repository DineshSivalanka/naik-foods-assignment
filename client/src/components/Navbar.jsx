import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">

      <div className="logo">
        <Link to="/">
          Naik<span>Foods</span>
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/store">Store</Link>
        <Link to="/about">About</Link>
      </div>

      <Link to="/cart" className="cart">
        🛒 Cart ({cartCount})
      </Link>

    </nav>
  );
};

export default Navbar;
