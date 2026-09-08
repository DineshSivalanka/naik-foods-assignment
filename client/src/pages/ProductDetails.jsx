import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Recommendations from "../components/Recommendations";
import ProductReviews from "../components/ProductReviews";
import DeliveryCheck from "../components/DeliveryCheck";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const { addToCart } = useCart();
  const { isLiked, addToWishlist, removeFromWishlist } = useWishlist();

  const toggleLike = () => {
    if (isLiked(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);

        // Update recently viewed in localStorage
        const viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
        const updatedViewed = viewed.filter(p => p._id !== data._id);
        updatedViewed.unshift(data);
        if (updatedViewed.length > 5) {
          updatedViewed.pop();
        }
        localStorage.setItem("recentlyViewed", JSON.stringify(updatedViewed));

      } catch (err) {
        console.error(err);
        setError("Unable to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <h2 className="status">
        Loading delicious products...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="status error">
        {error}
      </h2>
    );
  }

  if (!product) {
    return (
      <h2 className="status">
        Product not found
      </h2>
    );
  }

  return (
    <div className="product-details">

      <Link
        to="/store"
        className="back-link"
      >
        ← Back to Store
      </Link>

      <div className="details-container">

        <div className="details-image">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"; }}
          />
        </div>

        <div className="details-info">

          <span className="product-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <div className="details-rating">
            ⭐ {product.rating}
            <span>
              ({product.reviews} reviews)
            </span>
          </div>

          <div className="details-price">
            <strong>₹{product.price}</strong>

            {product.originalPrice && (
              <del>₹{product.originalPrice}</del>
            )}
          </div>

          <p className="details-weight">
            Weight: {product.weight}
          </p>

          <p className="details-description">
            {product.description}
          </p>

          <p className="stock">
            {product.stock > 0
              ? `✓ In Stock (${product.stock} available)`
              : "✕ Out of Stock"}
          </p>

          <DeliveryCheck />

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              className="add-cart-button"
              disabled={product.stock === 0}
              onClick={() => addToCart(product)}
              style={{ flex: 1 }}
            >
              🛒 Add to Cart
            </button>
            <button
              onClick={toggleLike}
              style={{ 
                background: 'white', 
                border: '1px solid var(--border-color)', 
                borderRadius: '8px', 
                padding: '0 20px', 
                fontSize: '24px', 
                cursor: 'pointer',
                color: '#ff4757'
              }}
            >
              {isLiked(product._id) ? "❤️" : "♡"}
            </button>
          </div>

        </div>

      </div>
      
      <ProductReviews product={product} />
      <Recommendations productId={product._id} />

    </div>
  );
};

export default ProductDetails;
