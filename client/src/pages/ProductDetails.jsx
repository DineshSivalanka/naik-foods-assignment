import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import { useCart } from "../context/CartContext";
import Recommendations from "../components/Recommendations";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const { addToCart } = useCart();

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
        Loading product...
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

          <button
            className="add-cart-button"
            disabled={product.stock === 0}
            onClick={() => addToCart(product)}
          >
            🛒 Add to Cart
          </button>

        </div>

      </div>
      
      <Recommendations productId={product._id} />

    </div>
  );
};

export default ProductDetails;
