import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { addToWishlist, getRecommendations } from "../services/api";

const FREE_DELIVERY_LIMIT = 999;

const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    restoreItem,
    cartTotal,
    clearCart,
  } = useCart();
  
  const { wishlistCount } = useWishlist(); // Just to trigger wishlist context if needed, though we will call api directly and might need to refresh
  const navigate = useNavigate();

  const [lastRemoved, setLastRemoved] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  
  // Promotion Code State
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (cart.length > 0) {
        try {
          const recs = await getRecommendations(cart[0]._id);
          const filteredRecs = recs.filter(r => !cart.some(c => c._id === r._id));
          setRecommendations(filteredRecs.slice(0, 4));
        } catch (error) {
          console.error("Failed to fetch recommendations:", error);
        }
      } else {
        setRecommendations([]);
      }
    };

    fetchRecommendations();
  }, [cart[0]?._id]);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleRemove = (item) => {
    removeFromCart(item._id);
    setLastRemoved(item);
    
    if (undoTimeout) clearTimeout(undoTimeout);
    
    const timeout = setTimeout(() => {
      setLastRemoved(null);
    }, 5000); // Hide undo after 5 seconds
    setUndoTimeout(timeout);
  };

  const handleUndo = () => {
    if (lastRemoved) {
      restoreItem(lastRemoved);
      setLastRemoved(null);
      if (undoTimeout) clearTimeout(undoTimeout);
    }
  };

  const handleSaveForLater = async (item) => {
    const clientId = localStorage.getItem("naikFoodsClientId") || "anonymous";
    try {
      await addToWishlist(clientId, item._id);
      removeFromCart(item._id);
      alert(`${item.name} saved for later!`);
      // Optionally trigger wishlist refresh here if needed
      window.location.reload(); // Quick way to refresh context
    } catch (error) {
      console.error("Failed to save for later", error);
      alert("Failed to save to wishlist.");
    }
  };

  const handleApplyCoupon = (e) => {
    e?.preventDefault();
    const code = couponCode.trim().toUpperCase();
    
    if (code === "FIRST100") {
      setAppliedCoupon("FIRST100");
      setCouponMessage({ type: "success", text: "✓ Coupon applied successfully" });
    } else if (code === "FREEDEL") {
      setAppliedCoupon("FREEDEL");
      setCouponMessage({ type: "success", text: "✓ Coupon applied successfully" });
    } else if (code) {
      setAppliedCoupon(null);
      setCouponMessage({ type: "error", text: "✕ Invalid or expired coupon" });
    } else {
      setAppliedCoupon(null);
      setCouponMessage(null);
    }
  };

  const remaining = FREE_DELIVERY_LIMIT - cartTotal;
  
  // Calculate Discounts
  const discountAmount = appliedCoupon === "FIRST100" ? 100 : 0;
  const isFreeDelivery = cartTotal >= FREE_DELIVERY_LIMIT || appliedCoupon === "FREEDEL";
  const deliveryFee = isFreeDelivery ? 0 : 40;
  
  const finalTotal = Math.max(0, cartTotal - discountAmount + deliveryFee);

  const progress = Math.min((cartTotal / FREE_DELIVERY_LIMIT) * 100, 100);

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200 mt-10 mx-auto max-w-2xl px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Add some delicious products to your cart.</p>
        <Link to="/store" className="inline-block bg-primary hover:bg-[#c2410c] text-white font-semibold py-3 px-8 rounded-lg transition-colors">
          Continue Shopping
        </Link>
        {lastRemoved && (
          <div className="mt-8 p-4 bg-gray-800 text-white rounded-lg inline-flex items-center gap-4 shadow-lg">
            <span>Removed {lastRemoved.name}</span>
            <button onClick={handleUndo} className="bg-transparent text-primary border border-primary px-3 py-1.5 rounded text-sm font-bold hover:bg-primary/10 transition-colors">
              Undo
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10 min-h-[60vh] relative">
      {/* Undo Toast Notification */}
      {lastRemoved && (
        <div className="fixed bottom-5 right-5 bg-gray-800 text-white p-4 rounded-lg flex items-center gap-5 shadow-xl z-[1000]">
          <span>Removed {lastRemoved.name}</span>
          <button onClick={handleUndo} className="bg-primary hover:bg-[#c2410c] text-white border-none px-3 py-1.5 rounded text-sm font-bold transition-colors">
            Undo
          </button>
        </div>
      )}

      <h1 className="text-[32px] font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Your Shopping Cart</h1>

      <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-xl p-5 mb-8 flex flex-col items-center shadow-sm">
        {remaining > 0 ? (
          <div className="text-center mb-4">
            <p className="mb-3 text-blue-900">🛍️ Add <strong className="font-bold text-blue-900">₹{remaining}</strong> more to unlock FREE DELIVERY</p>
            <Link to="/store" className="inline-block bg-primary hover:bg-[#c2410c] text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <p className="text-center mb-4 font-bold text-green-600">🎉 Congratulations!<br />You've unlocked FREE DELIVERY</p>
        )}
        <div className="w-full max-w-md h-2.5 bg-gray-200 rounded-full overflow-hidden mt-1 mb-2">
          <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <small className="text-gray-500 font-medium">₹{cartTotal} / ₹{FREE_DELIVERY_LIMIT}</small>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-[2]">
          <div className="flex justify-end mb-4">
            <button onClick={clearCart} className="bg-transparent text-red-500 border border-red-500 hover:bg-red-50 px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-colors text-sm">
              🗑️ Clear Cart
            </button>
          </div>

          {cart.map((item) => (
            <div className="flex items-center gap-6 bg-white p-5 rounded-xl border border-gray-200 mb-4 relative pb-16 shadow-sm" key={item._id}>
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"; }}
              />

              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-primary font-medium mb-3">₹{item.price}</p>

                <div className="bg-gray-100 rounded-lg p-1 inline-flex border border-gray-300">
                  <button onClick={() => decreaseQuantity(item._id)} className="bg-white w-8 h-8 rounded border border-gray-200 flex items-center justify-center cursor-pointer text-lg hover:bg-gray-50 transition-colors">−</button>
                  <span className="min-w-[40px] text-center font-bold text-base flex items-center justify-center">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item._id)} className="bg-white w-8 h-8 rounded border border-gray-200 flex items-center justify-center cursor-pointer text-lg hover:bg-gray-50 transition-colors">+</button>
                </div>
              </div>

              <strong className="text-xl text-gray-900 hidden sm:block pr-4">₹{item.price * item.quantity}</strong>

              {/* Action Buttons */}
              <div className="absolute bottom-4 left-5 sm:left-[144px] flex gap-4">
                <button 
                  onClick={() => handleRemove(item)} 
                  className="text-red-500 hover:text-red-600 bg-transparent border-none cursor-pointer flex items-center gap-1 font-medium text-sm transition-colors"
                >
                  🗑️ Remove
                </button>
                <button 
                  onClick={() => handleSaveForLater(item)} 
                  className="text-primary hover:text-[#c2410c] bg-transparent border-none cursor-pointer flex items-center gap-1 font-medium text-sm transition-colors"
                >
                  ❤️ Save for later
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 bg-gray-50 p-6 rounded-xl border border-gray-200 sticky top-24 h-max shadow-sm">
          {/* Promotion Code UX */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
            <h3 className="text-base font-bold mb-3 text-gray-900">Have a coupon?</h3>
            <form onSubmit={handleApplyCoupon} className="flex gap-2.5 mb-4">
              <input 
                type="text" 
                placeholder="Enter coupon code" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-3 py-2.5 rounded-lg border border-gray-300 uppercase focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button type="submit" className="bg-primary hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-lg font-bold transition-colors">
                Apply
              </button>
            </form>
            
            {couponMessage && (
              <div className={`mb-4 text-sm font-medium ${couponMessage.type === "success" ? "text-green-600" : "text-red-500"}`}>
                {couponMessage.text}
              </div>
            )}

            <div className="text-[13px] text-gray-500">
              <strong className="block mb-2 text-gray-800">Available Offers</strong>
              <div 
                className="mb-1.5 cursor-pointer flex items-center gap-1.5 hover:text-primary transition-colors"
                onClick={() => { setCouponCode("FIRST100"); setAppliedCoupon("FIRST100"); setCouponMessage({ type: "success", text: "✓ Coupon applied successfully" }); }}
              >
                <span>🎁</span> <span className="border-b border-dashed border-gray-300"><strong className="text-gray-700">FIRST100</strong> – ₹100 off</span>
              </div>
              <div 
                className="cursor-pointer flex items-center gap-1.5 hover:text-primary transition-colors"
                onClick={() => { setCouponCode("FREEDEL"); setAppliedCoupon("FREEDEL"); setCouponMessage({ type: "success", text: "✓ Coupon applied successfully" }); }}
              >
                <span>🚚</span> <span className="border-b border-dashed border-gray-300"><strong className="text-gray-700">FREEDEL</strong> – Free delivery</span>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Order Summary</h2>
          <div className="flex justify-between items-center mb-3 text-gray-700">
            <span>Subtotal</span>
            <strong className="text-gray-900 font-bold">₹{cartTotal}</strong>
          </div>
          
          {discountAmount > 0 && (
            <div className="flex justify-between items-center mb-3 text-green-600">
              <span>Discount ({appliedCoupon})</span>
              <strong className="font-bold">- ₹{discountAmount}</strong>
            </div>
          )}

          <div className="flex justify-between items-center mb-4 text-gray-700">
            <span>Delivery</span>
            <strong className="text-gray-900 font-bold">{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</strong>
          </div>
          <hr className="border-gray-200 my-4" />
          <div className="flex justify-between items-center text-[22px] font-extrabold text-gray-900 mb-2">
            <span>Total</span>
            <strong>₹{finalTotal}</strong>
          </div>
          
          {discountAmount > 0 && (
            <div className="text-center p-2.5 mt-4 bg-green-50 text-green-600 rounded-lg font-bold border border-dashed border-green-200">
              You saved ₹{discountAmount} 🎉
            </div>
          )}

          <button onClick={handleCheckout} className="w-full bg-primary hover:bg-[#c2410c] text-white font-bold py-3.5 rounded-lg transition-colors mt-6 flex justify-center items-center gap-2.5">
            Proceed to Secure Checkout &rarr;
          </button>
          
          <div className="text-center mt-4">
            <div className="text-xs text-gray-600 font-semibold mb-1">
              🔒 Secure payment powered by Razorpay
            </div>
            <div className="text-[11px] text-gray-500">
              Your order is protected by secure payment processing.
            </div>
          </div>
          
          <Link to="/store" className="block text-center mt-3 p-3 bg-white border-2 border-primary text-primary rounded-lg font-bold hover:bg-primary/5 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-200">
          <h2 className="text-[22px] font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
            Frequently Bought Together
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {recommendations.map(product => (
              <div key={product._id} className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col items-center text-center shadow-sm hover:-translate-y-1 transition-all">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-24 h-24 object-cover rounded-lg mb-3"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"; }}
                />
                <h4 className="text-sm font-bold text-gray-800 mb-1 flex-1 line-clamp-2">{product.name}</h4>
                <p className="font-extrabold text-primary mb-3 text-base">₹{product.price}</p>
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-white text-primary border border-primary hover:bg-primary hover:text-white py-2 rounded-lg font-bold text-sm transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

