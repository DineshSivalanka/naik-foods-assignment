import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const [paymentMethod, setPaymentMethod] = useState("UPI");
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
      <div className="text-center py-16 px-5 mt-10 max-w-2xl mx-auto bg-gray-50 rounded-2xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">You cannot checkout with an empty cart.</p>
        <button onClick={() => navigate("/store")} className="bg-primary hover:bg-[#c2410c] text-white font-semibold py-3 px-8 rounded-lg transition-colors">
          Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1050px] mx-auto px-5 py-8 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
      <div>
        <div className="mb-8 hidden sm:flex items-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-wide">
          <Link to="/cart" className="text-gray-700 hover:text-primary transition-colors">Cart</Link>
          <span>→</span>
          <span className="text-primary flex flex-col items-center relative">
            Information
            <span className="text-[10px] leading-none absolute -bottom-3">●</span>
          </span>
          <span>→</span>
          <span>Payment</span>
          <span>→</span>
          <span>Confirmation</span>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-gray-900">Checkout</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2.5 border-b border-gray-200 text-gray-900">Customer Information</h2>
            
            <div className="grid gap-4">
              <div>
                <label className="block mb-1.5 text-gray-800 font-medium text-sm">Full Name *</label>
                <input type="text" name="name" required title="Please enter your full name" value={formData.name} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white" />
              </div>
              
              <div>
                <label className="block mb-1.5 text-gray-800 font-medium text-sm">Phone Number *</label>
                <input type="tel" name="phone" required pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" value={formData.phone} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white" />
              </div>
              
              <div>
                <label className="block mb-1.5 text-gray-800 font-medium text-sm">Address *</label>
                <textarea name="address" required value={formData.address} onChange={handleInputChange} rows="3" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white resize-y" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-gray-800 font-medium text-sm">City *</label>
                  <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white" />
                </div>
                <div>
                  <label className="block mb-1.5 text-gray-800 font-medium text-sm">PIN Code *</label>
                  <input type="text" name="pinCode" required pattern="[0-9]{6}" title="PIN code must contain 6 digits" value={formData.pinCode} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2.5 border-b border-gray-200 text-gray-900">Payment Method</h2>
            
            <div className="flex flex-col gap-3">
              <label className={`flex flex-col cursor-pointer p-4 border rounded-lg transition-colors ${paymentMethod === "UPI" ? "bg-[#fff5f5] border-primary shadow-sm" : "bg-white border-gray-200 hover:border-gray-300"}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="paymentMethod" value="UPI" checked={paymentMethod === "UPI"} onChange={(e) => setPaymentMethod(e.target.value)} className="accent-primary w-4 h-4" />
                  <span className="font-bold text-gray-900">UPI</span>
                </div>
                <div className="text-sm text-gray-500 ml-7 mt-0.5 font-medium">Google Pay / PhonePe / Paytm</div>
              </label>
              
              <label className={`flex items-center gap-3 cursor-pointer p-4 border rounded-lg transition-colors ${paymentMethod === "Credit / Debit Card" ? "bg-[#fff5f5] border-primary shadow-sm" : "bg-white border-gray-200 hover:border-gray-300"}`}>
                <input type="radio" name="paymentMethod" value="Credit / Debit Card" checked={paymentMethod === "Credit / Debit Card"} onChange={(e) => setPaymentMethod(e.target.value)} className="accent-primary w-4 h-4" />
                <span className="font-bold text-gray-900">Credit / Debit Card</span>
              </label>

              <label className={`flex items-center gap-3 cursor-pointer p-4 border rounded-lg transition-colors ${paymentMethod === "Cash on Delivery" ? "bg-[#fff5f5] border-primary shadow-sm" : "bg-white border-gray-200 hover:border-gray-300"}`}>
                <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={paymentMethod === "Cash on Delivery"} onChange={(e) => setPaymentMethod(e.target.value)} className="accent-primary w-4 h-4" />
                <span className="font-bold text-gray-900">Cash on Delivery</span>
              </label>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full mt-2 py-4 text-[17px] font-extrabold bg-primary hover:bg-[#c2410c] text-white rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
            {loading ? "Processing..." : `🔒 Securely Place Order — ₹${finalTotal}`}
          </button>
        </form>
      </div>

      <div className="bg-gray-50 p-6 sm:p-8 rounded-xl h-fit sticky top-[100px] border border-gray-200 shadow-sm">
        
        {cartTotal < FREE_DELIVERY_LIMIT && (
          <div className="mb-6 p-4 bg-blue-50/50 border border-blue-100 rounded-lg">
            <p className="mb-2 text-blue-900 font-medium text-sm">🚚 Add <strong className="font-bold">₹{FREE_DELIVERY_LIMIT - cartTotal}</strong> more to get FREE delivery</p>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 transition-all" style={{ width: `${Math.min((cartTotal / FREE_DELIVERY_LIMIT) * 100, 100)}%` }} />
            </div>
            <small className="text-gray-500 font-medium block mt-1.5 text-[11px]">₹{cartTotal} / ₹{FREE_DELIVERY_LIMIT}</small>
          </div>
        )}

        <h2 className="text-xl font-bold mb-5 pb-2.5 border-b border-gray-200 text-gray-900">Order Summary</h2>
        
        <div className="flex flex-col gap-4 mb-5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {cart.map((item) => (
            <div key={item._id} className="flex gap-4 items-center">
              <img src={item.image} alt={item.name} className="w-[60px] h-[60px] object-cover rounded-lg border border-gray-200" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"; }} />
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm">{item.name}</div>
                <div className="text-gray-500 text-sm">Qty: {item.quantity}</div>
              </div>
              <div className="font-bold text-gray-900">₹{item.price * item.quantity}</div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mb-3 text-gray-600 font-medium">
          <span>Subtotal</span>
          <span className="text-gray-900 font-bold">₹{cartTotal}</span>
        </div>
        <div className="flex justify-between mb-4 text-gray-600 font-medium">
          <span>Delivery</span>
          <span className="text-gray-900 font-bold">{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
        </div>
        
        <div className="flex justify-between pt-4 border-t border-gray-200 text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>₹{finalTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
