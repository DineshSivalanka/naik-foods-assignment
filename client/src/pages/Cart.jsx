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
      <div className="empty-cart">
        <h1>Your Cart is Empty</h1>
        <p>Add some delicious products to your cart.</p>
        <Link to="/store" className="primary-button" style={{ marginTop: "20px", display: "inline-block", padding: "10px 20px" }}>
          Continue Shopping
        </Link>
        {lastRemoved && (
          <div style={{ marginTop: "20px", padding: "15px", background: "#333", color: "white", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "15px" }}>
            <span>Removed {lastRemoved.name}</span>
            <button onClick={handleUndo} style={{ background: "transparent", color: "var(--primary-color)", border: "1px solid var(--primary-color)", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
              Undo
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="cart-page" style={{ position: "relative" }}>
      {/* Undo Toast Notification */}
      {lastRemoved && (
        <div style={{ position: "fixed", bottom: "20px", right: "20px", background: "#333", color: "white", padding: "15px 20px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 1000 }}>
          <span>Removed {lastRemoved.name}</span>
          <button onClick={handleUndo} style={{ background: "var(--primary-color)", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
            Undo
          </button>
        </div>
      )}

      <h1>Your Shopping Cart</h1>

      <div className="delivery-box">
        {remaining > 0 ? (
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <p style={{ marginBottom: "10px" }}>🛍️ Add <strong>₹{remaining}</strong> more to unlock FREE DELIVERY</p>
            <Link to="/store" className="primary-button" style={{ display: "inline-block", padding: "8px 16px", fontSize: "14px", textDecoration: "none" }}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <p style={{ textAlign: "center", marginBottom: "15px", fontWeight: "bold", color: "#16a34a" }}>🎉 Congratulations!<br />You've unlocked FREE DELIVERY</p>
        )}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <small>₹{cartTotal} / ₹{FREE_DELIVERY_LIMIT}</small>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "15px" }}>
            <button onClick={clearCart} style={{ background: "transparent", color: "#ef4444", border: "1px solid #ef4444", padding: "8px 15px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "5px" }}>
              🗑️ Clear Cart
            </button>
          </div>

          {cart.map((item) => (
            <div className="cart-item" key={item._id} style={{ position: "relative", paddingBottom: "60px" }}>
              <img
                src={item.image}
                alt={item.name}
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"; }}
              />

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>

                <div className="quantity-controls" style={{ background: "#f1f5f9", borderRadius: "8px", padding: "5px", display: "inline-flex", border: "1px solid #cbd5e1" }}>
                  <button onClick={() => decreaseQuantity(item._id)} style={{ background: "white", width: "30px", height: "30px", borderRadius: "4px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "18px" }}>−</button>
                  <span style={{ minWidth: "40px", textAlign: "center", fontWeight: "bold", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item._id)} style={{ background: "white", width: "30px", height: "30px", borderRadius: "4px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "18px" }}>+</button>
                </div>
              </div>

              <strong>₹{item.price * item.quantity}</strong>

              {/* Action Buttons */}
              <div style={{ position: "absolute", bottom: "15px", left: "120px", display: "flex", gap: "15px" }}>
                <button 
                  onClick={() => handleRemove(item)} 
                  style={{ background: "transparent", color: "#ef4444", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontWeight: "500", fontSize: "14px" }}
                >
                  🗑️ Remove
                </button>
                <button 
                  onClick={() => handleSaveForLater(item)} 
                  style={{ background: "transparent", color: "var(--primary-color)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontWeight: "500", fontSize: "14px" }}
                >
                  ❤️ Save for later
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          {/* Promotion Code UX */}
          <div style={{ background: "white", padding: "15px", borderRadius: "8px", border: "1px solid var(--border-color)", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "16px", marginBottom: "10px", color: "var(--text-dark)" }}>Have a coupon?</h3>
            <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              <input 
                type="text" 
                placeholder="Enter coupon code" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={{ flex: 1, padding: "8px 12px", borderRadius: "4px", border: "1px solid var(--border-color)", textTransform: "uppercase" }}
              />
              <button type="submit" style={{ background: "var(--primary-color)", color: "white", border: "none", padding: "8px 15px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                Apply
              </button>
            </form>
            
            {couponMessage && (
              <div style={{ marginBottom: "15px", fontSize: "14px", fontWeight: "500", color: couponMessage.type === "success" ? "#16a34a" : "#ef4444" }}>
                {couponMessage.text}
              </div>
            )}

            <div style={{ fontSize: "13px", color: "var(--text-light)" }}>
              <strong style={{ display: "block", marginBottom: "5px", color: "var(--text-dark)" }}>Available Offers</strong>
              <div 
                style={{ marginBottom: "5px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
                onClick={() => { setCouponCode("FIRST100"); setAppliedCoupon("FIRST100"); setCouponMessage({ type: "success", text: "✓ Coupon applied successfully" }); }}
              >
                <span>🎁</span> <span style={{ borderBottom: "1px dashed #cbd5e1" }}><strong>FIRST100</strong> – ₹100 off</span>
              </div>
              <div 
                style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
                onClick={() => { setCouponCode("FREEDEL"); setAppliedCoupon("FREEDEL"); setCouponMessage({ type: "success", text: "✓ Coupon applied successfully" }); }}
              >
                <span>🚚</span> <span style={{ borderBottom: "1px dashed #cbd5e1" }}><strong>FREEDEL</strong> – Free delivery</span>
              </div>
            </div>
          </div>

          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>₹{cartTotal}</strong>
          </div>
          
          {discountAmount > 0 && (
            <div className="summary-row" style={{ color: "#16a34a" }}>
              <span>Discount ({appliedCoupon})</span>
              <strong>- ₹{discountAmount}</strong>
            </div>
          )}

          <div className="summary-row">
            <span>Delivery</span>
            <strong>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</strong>
          </div>
          <hr />
          <div className="summary-total">
            <span>Total</span>
            <strong>₹{finalTotal}</strong>
          </div>
          
          {discountAmount > 0 && (
            <div style={{ textAlign: "center", padding: "10px", marginTop: "15px", background: "#f0fdf4", color: "#16a34a", borderRadius: "6px", fontWeight: "bold", border: "1px dashed #bbf7d0" }}>
              You saved ₹{discountAmount} 🎉
            </div>
          )}

          <button className="checkout-button" onClick={handleCheckout} style={{ marginTop: "15px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
            Proceed to Secure Checkout &rarr;
          </button>
          
          <div style={{ textAlign: "center", marginTop: "12px" }}>
            <div style={{ fontSize: "12px", color: "#475569", fontWeight: "600", marginBottom: "4px" }}>
              🔒 Secure payment powered by Razorpay
            </div>
            <div style={{ fontSize: "11px", color: "#64748b" }}>
              Your order is protected by secure payment processing.
            </div>
          </div>
          
          <Link to="/store" className="secondary-button" style={{ 
            display: 'block', 
            textAlign: 'center', 
            marginTop: '10px', 
            padding: '12px', 
            background: 'white', 
            border: '1px solid var(--primary-color)', 
            color: 'var(--primary-color)', 
            borderRadius: '8px', 
            fontWeight: '600', 
            textDecoration: 'none'
          }}>
            Continue Shopping
          </Link>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div style={{ marginTop: "60px", padding: "30px", background: "#f8fafc", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "20px", color: "var(--text-dark)", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
            Frequently Bought Together
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
            {recommendations.map(product => (
              <div key={product._id} style={{ background: "white", padding: "15px", borderRadius: "8px", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }} 
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"; }}
                />
                <h4 style={{ fontSize: "14px", margin: "0 0 5px 0", color: "var(--text-dark)", flex: 1 }}>{product.name}</h4>
                <p style={{ fontWeight: "bold", margin: "0 0 10px 0", color: "var(--primary-color)" }}>₹{product.price}</p>
                <button 
                  onClick={() => addToCart(product)}
                  style={{ width: "100%", background: "white", color: "var(--primary-color)", border: "1px solid var(--primary-color)", padding: "8px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "13px" }}
                >
                  Add
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

