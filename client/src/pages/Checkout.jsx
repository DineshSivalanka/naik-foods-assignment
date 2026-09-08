import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/api";

const FREE_DELIVERY_LIMIT = 999;

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pinCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);

  const deliveryFee = cartTotal >= FREE_DELIVERY_LIMIT ? 0 : 40;
  const finalTotal = cartTotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);

    const clientId = localStorage.getItem("naikFoodsClientId") || "anonymous";

    const orderData = {
      clientId,
      customerInfo: formData,
      products: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      summary: {
        subtotal: cartTotal,
        deliveryFee,
        total: finalTotal,
      },
      paymentMethod,
    };

    try {
      await createOrder(orderData);
      
      // Update purchased items in localStorage so they can leave reviews
      const purchased = JSON.parse(localStorage.getItem("purchasedItems") || "[]");
      const newPurchased = [...new Set([...purchased, ...cart.map(item => item._id)])];
      localStorage.setItem("purchasedItems", JSON.stringify(newPurchased));

      clearCart();
      alert("Order placed successfully! Thank you for shopping with Naik Foods.");
      navigate("/store");
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart" style={{ textAlign: "center", padding: "50px 20px" }}>
        <h2>Your cart is empty</h2>
        <p>You cannot checkout with an empty cart.</p>
        <button onClick={() => navigate("/store")} className="primary-button" style={{ marginTop: "20px", padding: "10px 20px" }}>
          Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page" style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px", display: "grid", gridTemplateColumns: "1fr 400px", gap: "40px" }}>
      <div className="checkout-form">
        <h1 style={{ marginBottom: "30px", color: "var(--text-dark)" }}>Checkout</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-section" style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "15px", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>Customer Information</h2>
            
            <div style={{ display: "grid", gap: "15px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "5px", color: "var(--text-dark)", fontWeight: "500" }}>Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: "4px" }} />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "5px", color: "var(--text-dark)", fontWeight: "500" }}>Phone Number</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: "4px" }} />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "5px", color: "var(--text-dark)", fontWeight: "500" }}>Address</label>
                <textarea name="address" required value={formData.address} onChange={handleInputChange} rows="3" style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: "4px", resize: "vertical" }} />
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", color: "var(--text-dark)", fontWeight: "500" }}>City</label>
                  <input type="text" name="city" required value={formData.city} onChange={handleInputChange} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: "4px" }} />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", color: "var(--text-dark)", fontWeight: "500" }}>PIN Code</label>
                  <input type="text" name="pinCode" required value={formData.pinCode} onChange={handleInputChange} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: "4px" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="form-section" style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "15px", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>Payment Method</h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", padding: "15px", border: "1px solid var(--border-color)", borderRadius: "8px", background: paymentMethod === "Cash on Delivery" ? "#fff5f5" : "white" }}>
                <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={paymentMethod === "Cash on Delivery"} onChange={(e) => setPaymentMethod(e.target.value)} style={{ accentColor: "var(--primary-color)" }} />
                Cash on Delivery (COD)
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", padding: "15px", border: "1px solid var(--border-color)", borderRadius: "8px", background: paymentMethod === "Online Payment" ? "#fff5f5" : "white" }}>
                <input type="radio" name="paymentMethod" value="Online Payment" checked={paymentMethod === "Online Payment"} onChange={(e) => setPaymentMethod(e.target.value)} style={{ accentColor: "var(--primary-color)" }} />
                Online Payment
              </label>
            </div>
          </div>

          <button type="submit" disabled={loading} className="primary-button" style={{ width: "100%", padding: "15px", fontSize: "16px", fontWeight: "bold", background: "var(--primary-color)", color: "white", border: "none", borderRadius: "8px", cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>

      <div className="checkout-summary" style={{ background: "#f8fafc", padding: "30px", borderRadius: "12px", height: "fit-content", position: "sticky", top: "20px" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "20px", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>Order Summary</h2>
        
        <div className="summary-items" style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "20px", maxHeight: "300px", overflowY: "auto" }}>
          {cart.map((item) => (
            <div key={item._id} style={{ display: "flex", gap: "15px" }}>
              <img src={item.image} alt={item.name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"; }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "500", color: "var(--text-dark)", fontSize: "14px" }}>{item.name}</div>
                <div style={{ color: "var(--text-light)", fontSize: "14px" }}>Qty: {item.quantity}</div>
              </div>
              <div style={{ fontWeight: "600" }}>₹{item.price * item.quantity}</div>
            </div>
          ))}
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", color: "var(--text-light)" }}>
          <span>Subtotal</span>
          <span>₹{cartTotal}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", color: "var(--text-light)" }}>
          <span>Delivery</span>
          <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "15px", borderTop: "1px solid var(--border-color)", fontSize: "18px", fontWeight: "bold", color: "var(--text-dark)" }}>
          <span>Total</span>
          <span>₹{finalTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
