import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isLiked, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const [showToast, setShowToast] = useState(false);

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:-translate-y-2 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col group cursor-pointer" onClick={() => navigate(`/product/${product._id}`)}>
      
      <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
        <div className="w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"; }}
          />
        </div>
        <button 
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-xl hover:text-primary transition-colors z-10 border border-gray-100" 
          onClick={toggleLike}
          aria-label="Like product"
        >
          {isLiked(product._id) ? "❤️" : "♡"}
        </button>

        {showToast && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap z-20 shadow-md">
            ♥ Added to wishlist
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        
        <div className="text-sm text-yellow-500 font-medium mb-2">
          ⭐ {product.rating}
          <span className="text-gray-500 font-normal"> ({product.reviews} reviews)</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>

        <div className="text-sm text-gray-500 mb-4">
          {product.category} • {product.weight}
        </div>

        <div className="flex items-center flex-wrap gap-2 mb-2">
          <strong className="text-xl font-extrabold text-gray-900">₹{product.price}</strong>
          {product.originalPrice && (
            <>
              <del className="text-sm text-gray-400 font-medium">₹{product.originalPrice}</del>
              <span className="bg-[#fefce8] text-[#a16207] text-[11px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide border border-[#fef08a]">{discountPercent}% OFF</span>
            </>
          )}
        </div>

        <div className={`text-sm font-medium mb-4 ${product.stock > 0 ? "text-green-600" : "text-primary"}`}>
          {product.stock > 0 ? "✓ In Stock" : "✕ Out of Stock"}
        </div>

        <button
          className={`mt-auto w-full py-3 rounded-lg font-semibold transition-all border ${product.stock > 0 ? "bg-primary hover:bg-[#c2410c] text-white border-transparent" : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"}`}
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
