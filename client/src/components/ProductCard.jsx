import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product._id}`)} style={{ cursor: "pointer" }}>
      
      <div className="product-image-container" style={{ position: "relative" }}>
        <div className="product-image">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"; }}
          />
        </div>
        <button 
          className="like-btn" 
          onClick={toggleLike}
          aria-label="Like product"
        >
          {liked ? "❤️" : "♡"}
        </button>
      </div>

      <div className="product-info">
        
        <div className="rating" style={{ marginBottom: "8px" }}>
          ⭐ {product.rating}
          <span> ({product.reviews} reviews)</span>
        </div>

        <h3 style={{ marginBottom: "4px" }}>{product.name}</h3>

        <div className="product-tags" style={{ fontSize: "13px", color: "var(--text-light)", marginBottom: "16px" }}>
          {product.category} • {product.weight}
        </div>

        <div className="price-row" style={{ margin: "0 0 8px 0" }}>
          <strong>₹{product.price}</strong>
          {product.originalPrice && (
            <>
              <del>₹{product.originalPrice}</del>
              <span className="discount-badge">{discountPercent}% OFF</span>
            </>
          )}
        </div>

        <div className="stock-status" style={{ fontSize: "14px", marginBottom: "16px", fontWeight: "500", color: product.stock > 0 ? "var(--secondary-color)" : "var(--primary-color)" }}>
          {product.stock > 0 ? "✓ In Stock" : "✕ Out of Stock"}
        </div>

        <button
          className="add-to-cart-btn"
          disabled={product.stock === 0}
          onClick={handleAddToCart}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>

      </div>
    </div>
  );
};

export default ProductCard;
