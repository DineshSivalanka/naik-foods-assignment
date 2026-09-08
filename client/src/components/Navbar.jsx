import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

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
        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="nav-actions" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Link to="/wishlist" className="wishlist-link" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}>
          ❤️ Wishlist ({wishlistCount})
        </Link>
        <Link to="/cart" className="cart">
          🛒 Cart ({cartCount})
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;
