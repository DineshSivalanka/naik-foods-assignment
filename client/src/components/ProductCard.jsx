import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">

      <Link
        to={`/product/${product._id}`}
        className="product-image"
      >
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"; }}
        />
      </Link>

      <div className="product-info">

        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <div className="rating">
          ⭐ {product.rating}
          <span> ({product.reviews} reviews)</span>
        </div>

        <p className="weight">
          {product.weight}
        </p>

        <div className="price-row">
          <strong>₹{product.price}</strong>

          {product.originalPrice && (
            <del>₹{product.originalPrice}</del>
          )}
        </div>

        <Link
          to={`/product/${product._id}`}
          className="view-product"
        >
          View Product
        </Link>

      </div>
    </div>
  );
};

export default ProductCard;
