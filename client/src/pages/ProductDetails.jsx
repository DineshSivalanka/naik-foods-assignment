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
  
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const { isLiked, addToWishlist, removeFromWishlist } = useWishlist();

  const toggleLike = () => {
    if (isLiked(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
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
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6">

      <Link
        to="/store"
        className="inline-block mb-4 lg:mb-6 text-gray-600 font-medium hover:text-primary transition-colors"
      >
        ← Back to Store
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 lg:gap-12 bg-white p-6 lg:p-10 rounded-2xl shadow-sm border border-gray-100 mb-10 w-full items-start">

        <div className="flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden aspect-square lg:aspect-auto lg:h-[480px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
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

          {/* Action Area */}
          <div className="flex gap-4 mt-8">
            {product.stock === 0 ? (
              <button
                disabled
                className="flex-1 py-4 bg-gray-100 text-gray-400 font-bold rounded-xl text-lg cursor-not-allowed border border-gray-200 text-center"
              >
                Out of Stock
              </button>
            ) : (() => {
              const cartItem = cart.find((item) => item._id === product._id);
              const quantityInCart = cartItem ? cartItem.quantity : 0;

              return quantityInCart === 0 ? (
                <button
                  className="flex-1 py-4 bg-primary hover:bg-[#c2410c] text-white font-bold rounded-xl text-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg active:scale-98"
                  onClick={() => addToCart(product, 1)}
                >
                  🛒 Add to Cart
                </button>
              ) : (
                <div className="flex-1 flex items-center justify-between bg-orange-50/90 border-2 border-primary rounded-xl px-5 py-3 shadow-xs">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(product._id)}
                    className="w-10 h-10 rounded-lg bg-primary hover:bg-[#c2410c] text-white font-bold text-xl flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-xs"
                    title={quantityInCart === 1 ? "Remove from cart" : "Decrease quantity"}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <div className="flex flex-col items-center select-none">
                    <span className="font-extrabold text-2xl text-primary leading-tight">
                      {quantityInCart}
                    </span>
                    <span className="text-xs font-semibold text-orange-800/80 uppercase tracking-wider">
                      in cart
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => increaseQuantity(product._id)}
                    disabled={product.stock !== undefined && quantityInCart >= product.stock}
                    className="w-10 h-10 rounded-lg bg-primary hover:bg-[#c2410c] text-white font-bold text-xl flex items-center justify-center transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                    title="Increase quantity"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              );
            })()}

            <button
              onClick={toggleLike}
              className={`border rounded-xl px-6 text-3xl cursor-pointer transition-all flex items-center justify-center shadow-sm hover:scale-105 active:scale-90 ${
                isLiked(product._id)
                  ? "bg-red-50 border-red-200 text-red-500 shadow-red-100"
                  : "bg-white border-gray-200 hover:border-red-200 text-gray-400 hover:text-red-500"
              }`}
              aria-label="Toggle wishlist"
              title={isLiked(product._id) ? "Remove from wishlist" : "Add to wishlist"}
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
