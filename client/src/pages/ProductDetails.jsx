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
      <h2 className="text-center py-24 text-gray-500 font-medium">
        Loading delicious products...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="text-center py-24 text-red-500 font-medium">
        {error}
      </h2>
    );
  }

  if (!product) {
    return (
      <h2 className="text-center py-24 text-gray-500 font-medium">
        Product not found
      </h2>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-10">

      <Link
        to="/store"
        className="inline-block mb-8 text-gray-600 font-medium hover:text-primary transition-colors"
      >
        ← Back to Store
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-10">

        <div className="flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden aspect-square lg:aspect-auto">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"; }}
          />
        </div>

        <div className="flex flex-col justify-center">

          <span className="inline-block bg-primary/10 text-primary px-3 py-1.5 rounded-md text-sm font-bold uppercase tracking-wider w-fit mb-4">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>

          <div className="flex items-center text-yellow-500 font-bold mb-6 text-lg">
            ⭐ {product.rating}
            <span className="text-gray-500 font-normal text-base ml-2">
              ({product.reviews} reviews)
            </span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <strong className="text-4xl font-extrabold text-gray-900">₹{product.price}</strong>

            {product.originalPrice && (
              <del className="text-xl text-gray-400 font-medium">₹{product.originalPrice}</del>
            )}
          </div>

          <p className="text-gray-600 font-medium mb-6 bg-gray-50 p-3 rounded-lg border border-gray-200 w-fit">
            Weight: {product.weight}
          </p>

          <p className="text-gray-600 leading-relaxed mb-8 text-lg">
            {product.description}
          </p>

          <p className={`font-bold mb-8 ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
            {product.stock > 0
              ? `✓ In Stock (${product.stock} available)`
              : "✕ Out of Stock"}
          </p>

          <DeliveryCheck />

          <div className="flex gap-4 mt-8">
            <button
              className="flex-1 py-4 bg-primary hover:bg-[#c2410c] text-white font-bold rounded-xl text-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={product.stock === 0}
              onClick={() => addToCart(product)}
            >
              🛒 Add to Cart
            </button>
            <button
              onClick={toggleLike}
              className="bg-white border border-gray-200 hover:border-red-200 hover:bg-red-50 rounded-xl px-6 text-3xl cursor-pointer text-[#ff4757] transition-colors flex items-center justify-center shadow-sm"
              aria-label="Toggle wishlist"
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
