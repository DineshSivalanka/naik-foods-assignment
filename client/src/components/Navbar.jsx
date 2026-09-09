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
    <nav className="flex items-center justify-between px-5 lg:px-[8%] h-20 bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-extrabold tracking-tight text-gray-900">
        <Link to="/" onClick={closeMenu}>
          Naik<span className="text-primary">Foods</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-8 relative z-50">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-800 hover:text-primary font-medium transition-colors cursor-pointer">Home</Link>
        <Link to="/store" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-800 hover:text-primary font-medium transition-colors cursor-pointer">Store</Link>
        <Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-800 hover:text-primary font-medium transition-colors cursor-pointer">About</Link>
        <Link to="/blog" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-800 hover:text-primary font-medium transition-colors cursor-pointer">Blogs</Link>
        <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-800 hover:text-primary font-medium transition-colors cursor-pointer">Contact</Link>
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-5">
        <Link to="/wishlist" className="flex items-center gap-1.5 text-gray-800 hover:text-primary font-medium transition-colors">
          <div className="relative flex">
            <Heart size={20} strokeWidth={2.2} />
            {wishlistCount > 0 && <span className="absolute -top-2 -right-2.5 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold min-w-[16px] text-center">{wishlistCount}</span>}
          </div>
          <span className="hidden lg:inline">Wishlist</span>
        </Link>

        <Link to="/orders" className="flex items-center gap-1.5 text-gray-800 hover:text-primary font-medium transition-colors">
          <Package size={20} strokeWidth={2.2} />
          <span className="hidden lg:inline">Orders</span>
        </Link>

        <Link to="/account" className="flex items-center gap-1.5 text-gray-800 hover:text-primary font-medium transition-colors">
          <UserRound size={20} strokeWidth={2.2} />
          <span className="hidden lg:inline">Account</span>
        </Link>
        
        <Link to="/cart" className="flex items-center gap-2 bg-gradient-to-br from-primary to-orange-500 text-white px-4 py-2.5 rounded-lg font-semibold hover:-translate-y-0.5 shadow-md shadow-orange-500/20 transition-all">
          <ShoppingCart size={20} strokeWidth={2.5} />
          <span className="hidden lg:inline">Cart</span>
          {cartCount > 0 && <span className="bg-white/25 px-2 py-0.5 rounded-full text-[13px]">{cartCount}</span>}
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="block lg:hidden text-gray-800 p-1 hover:text-primary transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl flex flex-col p-4 lg:hidden">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-3 py-3 px-4 text-gray-800 hover:text-primary hover:bg-gray-50 rounded-lg font-medium border-b border-gray-100">
            <House size={19} />
            <span>Home</span>
          </Link>

          <Link to="/store" onClick={closeMenu} className="flex items-center gap-3 py-3 px-4 text-gray-800 hover:text-primary hover:bg-gray-50 rounded-lg font-medium border-b border-gray-100">
            <Store size={19} />
            <span>Store</span>
          </Link>

          <Link to="/about" onClick={closeMenu} className="flex items-center gap-3 py-3 px-4 text-gray-800 hover:text-primary hover:bg-gray-50 rounded-lg font-medium border-b border-gray-100">
            <Info size={19} />
            <span>About</span>
          </Link>

          <Link to="/blog" onClick={closeMenu} className="flex items-center gap-3 py-3 px-4 text-gray-800 hover:text-primary hover:bg-gray-50 rounded-lg font-medium border-b border-gray-100">
            <Newspaper size={19} />
            <span>Blogs</span>
          </Link>

          <Link to="/contact" onClick={closeMenu} className="flex items-center gap-3 py-3 px-4 text-gray-800 hover:text-primary hover:bg-gray-50 rounded-lg font-medium">
            <Phone size={19} />
            <span>Contact</span>
          </Link>

          <Link to="/account" onClick={closeMenu} className="flex items-center gap-3 py-3 px-4 text-gray-800 hover:text-primary hover:bg-gray-50 rounded-lg font-medium border-t border-gray-200 mt-2">
            <UserRound size={19} />
            <span>Account</span>
          </Link>

          <Link to="/orders" onClick={closeMenu} className="flex items-center gap-3 py-3 px-4 text-gray-800 hover:text-primary hover:bg-gray-50 rounded-lg font-medium border-b border-gray-100">
            <Package size={19} />
            <span>Orders</span>
          </Link>

          <Link to="/wishlist" onClick={closeMenu} className="flex items-center gap-3 py-3 px-4 text-gray-800 hover:text-primary hover:bg-gray-50 rounded-lg font-medium border-b border-gray-100">
            <Heart size={19} />
            <span>Wishlist</span>
            {wishlistCount > 0 && <span className="ml-auto bg-primary text-white text-xs px-2 py-0.5 rounded-full font-bold">{wishlistCount}</span>}
          </Link>

          <Link to="/cart" onClick={closeMenu} className="flex items-center gap-3 py-3 px-4 text-gray-800 hover:text-primary hover:bg-gray-50 rounded-lg font-medium border-b border-gray-100">
            <ShoppingCart size={19} />
            <span>Cart</span>
            {cartCount > 0 && <span className="ml-auto bg-primary text-white text-xs px-2 py-0.5 rounded-full font-bold">{cartCount}</span>}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
