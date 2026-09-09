import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Plus, Minus } from "lucide-react";

const ProductCard = ({ product }) => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const { isLiked, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const cartItem = cart.find((item) => item._id === product._id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const liked = isLiked(product._id);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === undefined || quantityInCart < product.stock) {
      increaseQuantity(product._id);
    }
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    decreaseQuantity(product._id);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (liked) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1500);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col group cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
        <div className="w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"; }}
          />
        </div>
        
        {/* Wishlist Button with fast animation */}
        <button 
          className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-white/95 backdrop-blur-xs shadow-md flex items-center justify-center text-xl hover:scale-110 active:scale-90 transition-all duration-150 z-10 border border-gray-100 cursor-pointer ${
            liked ? "text-red-500 scale-105 shadow-red-200/50" : "text-gray-400 hover:text-red-500"
          }`}
          onClick={toggleLike}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          title={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          {liked ? "❤️" : "♡"}
        </button>

        {showToast && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap z-20 shadow-lg animate-fade-in backdrop-blur-xs">
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

        {/* Action Button: In-place Increment/Decrement replacement */}
        {product.stock === 0 ? (
          <button
            disabled
            className="mt-auto w-full py-2.5 rounded-lg font-semibold bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed text-center text-sm"
          >
            Out of Stock
          </button>
        ) : quantityInCart === 0 ? (
          <button
            type="button"
            className="mt-auto w-full py-2.5 rounded-lg font-semibold bg-primary hover:bg-[#c2410c] text-white border border-transparent cursor-pointer shadow-sm hover:shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 text-sm"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        ) : (
          <div
            className="mt-auto w-full flex items-center justify-between bg-orange-50/90 border-2 border-primary rounded-lg p-1 transition-all shadow-xs"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <button
              type="button"
              onClick={handleDecrement}
              aria-label="Decrease quantity"
              className="w-8 h-8 rounded-md bg-primary hover:bg-[#c2410c] text-white flex items-center justify-center font-bold text-base active:scale-90 transition-all cursor-pointer shadow-xs"
              title={quantityInCart === 1 ? "Remove from cart" : "Decrease quantity"}
            >
              <Minus size={15} strokeWidth={2.8} />
            </button>

            <div className="flex items-center gap-1.5 select-none px-2">
              <span className="font-extrabold text-sm text-primary leading-none">
                {quantityInCart}
              </span>
              <span className="text-[11px] font-semibold text-orange-800/80 uppercase tracking-wider">
                in cart
              </span>
            </div>

            <button
              type="button"
              onClick={handleIncrement}
              disabled={product.stock !== undefined && quantityInCart >= product.stock}
              aria-label="Increase quantity"
              className="w-8 h-8 rounded-md bg-primary hover:bg-[#c2410c] text-white flex items-center justify-center font-bold text-base active:scale-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
              title="Increase quantity"
            >
              <Plus size={15} strokeWidth={2.8} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductCard;
