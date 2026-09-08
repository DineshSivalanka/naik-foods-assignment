import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="store-page">
      <div className="store-header">
        <h1>Your Wishlist ❤️</h1>
        <p>Items you love, saved for later.</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="store-message">
          <div className="empty-icon">♡</div>
          <h3>Your wishlist is empty</h3>
          <p>Explore our store and add some favorites!</p>
          <Link to="/store" className="shop-button" style={{ marginTop: '20px', display: 'inline-block' }}>
            Go to Store
          </Link>
        </div>
      ) : (
        <div className="product-grid">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
