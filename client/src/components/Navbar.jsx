import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { UserRound, Package, Heart, ShoppingCart, Menu, X, House, Store, Info, Newspaper, Phone } from "lucide-react";

const Navbar = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          Naik<span>Foods</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/store">Store</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blogs</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* Desktop Actions */}
      <div className="nav-actions" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/wishlist" className="action-link" style={{ textDecoration: 'none', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500', transition: 'color 0.2s' }}>
          <div style={{ position: 'relative', display: 'flex' }}>
            <Heart size={20} strokeWidth={2.2} />
            {wishlistCount > 0 && <span style={{ position: 'absolute', top: '-8px', right: '-10px', background: 'var(--primary-color)', color: 'white', fontSize: '10px', padding: '1px 5px', borderRadius: '10px', fontWeight: 'bold', minWidth: '16px', textAlign: 'center' }}>{wishlistCount}</span>}
          </div>
          <span className="action-text">Wishlist</span>
        </Link>

        <Link to="/orders" className="action-link" style={{ textDecoration: 'none', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500', transition: 'color 0.2s' }}>
          <Package size={20} strokeWidth={2.2} />
          <span className="action-text">Orders</span>
        </Link>

        <Link to="/account" className="action-link" style={{ textDecoration: 'none', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500', transition: 'color 0.2s' }}>
          <UserRound size={20} strokeWidth={2.2} />
          <span className="action-text">Account</span>
        </Link>
        
        <Link to="/cart" className="cart" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, var(--primary-color) 0%, #f97316 100%)', padding: '10px 18px', borderRadius: '8px', fontWeight: '600', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 10px rgba(234, 88, 12, 0.25)' }}>
          <ShoppingCart size={20} strokeWidth={2.5} />
          <span>Cart</span>
          {cartCount > 0 && <span style={{ background: 'rgba(255,255,255,0.25)', padding: '2px 8px', borderRadius: '12px', fontSize: '13px' }}>{cartCount}</span>}
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={closeMenu}>
            <House size={19} />
            <span>Home</span>
          </Link>

          <Link to="/store" onClick={closeMenu}>
            <Store size={19} />
            <span>Store</span>
          </Link>

          <Link to="/about" onClick={closeMenu}>
            <Info size={19} />
            <span>About</span>
          </Link>

          <Link to="/blog" onClick={closeMenu}>
            <Newspaper size={19} />
            <span>Blogs</span>
          </Link>

          <Link to="/contact" onClick={closeMenu}>
            <Phone size={19} />
            <span>Contact</span>
          </Link>

          <Link to="/account" onClick={closeMenu} className="account-menu-link">
            <UserRound size={19} />
            <span>Account</span>
          </Link>

          <Link to="/orders" onClick={closeMenu}>
            <Package size={19} />
            <span>Orders</span>
          </Link>

          <Link to="/wishlist" onClick={closeMenu}>
            <Heart size={19} />
            <span>Wishlist</span>
            {wishlistCount > 0 && <span className="mobile-badge">{wishlistCount}</span>}
          </Link>

          <Link to="/cart" onClick={closeMenu}>
            <ShoppingCart size={19} />
            <span>Cart</span>
            {cartCount > 0 && <span className="mobile-badge">{cartCount}</span>}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
