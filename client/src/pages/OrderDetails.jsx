import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getOrderById } from '../services/api';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Failed to load order details.");
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-[800px] mx-auto px-5 py-12 flex justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-[800px] mx-auto px-5 py-12 text-center min-h-[70vh]">
        <p className="text-red-500 mb-4">{error || "Order not found"}</p>
        <button onClick={() => navigate("/orders")} className="px-6 py-2 bg-primary text-white rounded-lg font-bold">
          Back to Orders
        </button>
      </div>
    );
  }

  const orderId = order._id.slice(-6).toUpperCase();
  const date = new Date(order.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
  
  const estDate = new Date(order.createdAt);
  estDate.setDate(estDate.getDate() + 3);
  const estDateEnd = new Date(estDate);
  estDateEnd.setDate(estDateEnd.getDate() + 1);
  const estDeliveryStr = `${estDate.toLocaleDateString("en-IN", { month: "short", day: "numeric" })} – ${estDateEnd.toLocaleDateString("en-IN", { month: "short", day: "numeric" })}`;

  const getStatusIndex = (status) => {
    const statuses = ['Confirmed', 'Packed', 'Shipped', 'Delivered'];
    return statuses.indexOf(status);
  };
  
  const stepIndex = getStatusIndex(order.status || "Confirmed");
  const statuses = ['Confirmed', 'Packed', 'Shipped', 'Delivered'];

  // Add dummy dates for timeline
  const getTimelineDate = (idx) => {
    const d = new Date(order.createdAt);
    if (idx === 0) return d.toLocaleDateString("en-IN", { month: "short", day: "numeric" }); // Confirmed
    if (idx === 1) return d.toLocaleDateString("en-IN", { month: "short", day: "numeric" }); // Packed
    d.setDate(d.getDate() + 1);
    if (idx === 2) return d.toLocaleDateString("en-IN", { month: "short", day: "numeric" }); // Shipped
    if (idx === 3) return `Expected ${estDeliveryStr}`; // Delivered
    return "";
  };

  return (
    <div className="max-w-[800px] mx-auto px-5 py-10 min-h-[70vh]">
      <button onClick={() => navigate("/orders")} className="text-gray-500 hover:text-primary mb-6 flex items-center gap-2 transition-colors font-medium text-sm">
        ← Back to My Orders
      </button>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 m-0">Order #{orderId}</h1>
            <p className="text-gray-500 text-sm mt-1">Placed on {date}</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-gray-900">₹{order.summary.total}</div>
            <div className="text-sm font-medium text-gray-700 mt-1 flex items-center gap-1.5 justify-end">
              🚚 Estimated delivery: <span className="font-bold">{estDeliveryStr}</span>
            </div>
          </div>
        </div>

        {/* Status Tracker */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xs font-bold text-gray-500 tracking-wider mb-6">ORDER STATUS</h2>
          <div className="hidden sm:flex items-start justify-between relative mt-4 max-w-[600px]">
            <div className="absolute left-0 right-0 top-3.5 -translate-y-1/2 h-[2px] bg-gray-200 z-0"></div>
            {statuses.map((step, idx) => {
              const isCompleted = stepIndex >= idx;
              const isCurrent = stepIndex === idx;
              return (
                <div key={step} className="flex flex-col items-center gap-2 bg-transparent px-3 relative z-10 w-24">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                    isCompleted ? (stepIndex === 3 ? 'bg-green-500 border-green-500 text-white' : 'bg-primary border-primary text-white') : 'bg-white border-gray-300 text-transparent'
                  }`}>
                    {isCompleted ? '✓' : (isCurrent ? '●' : '')}
                  </div>
                  <div className="text-center">
                    <span className={`block text-[13px] font-bold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>{step}</span>
                    <span className={`block text-[11px] font-medium mt-0.5 ${isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>{getTimelineDate(idx)}</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Mobile Tracking */}
          <div className="sm:hidden flex flex-col gap-4">
            {statuses.map((step, idx) => {
              const isCompleted = stepIndex >= idx;
              const isCurrent = stepIndex === idx;
              return (
                <div key={step} className="flex items-center gap-3">
                   <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 shrink-0 ${
                    isCompleted ? (stepIndex === 3 ? 'bg-green-500 border-green-500 text-white' : 'bg-primary border-primary text-white') : 'bg-white border-gray-300 text-transparent'
                  }`}>
                    {isCompleted ? '✓' : (isCurrent ? '●' : '')}
                  </div>
                  <div>
                    <span className={`block text-[13px] font-bold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>{step}</span>
                    <span className={`block text-[11px] font-medium mt-0.5 ${isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>{getTimelineDate(idx)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Items */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xs font-bold text-gray-500 tracking-wider mb-4">ITEMS IN YOUR ORDER</h2>
          <div className="flex flex-col gap-4">
            {order.products.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <img 
                  src={item.product?.image || "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"} 
                  alt={item.product?.name || "Product"} 
                  className="w-20 h-20 rounded-lg object-cover border border-gray-200" 
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"; }}
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-[15px]">{item.product?.name || "Product"}</h3>
                  <div className="text-gray-500 text-sm mt-1">Qty: {item.quantity}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">₹{item.price * item.quantity}</div>
                  {item.quantity > 1 && <div className="text-xs text-gray-500 mt-1">₹{item.price} each</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address and Payment Split */}
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 p-6 border-b sm:border-b-0 sm:border-r border-gray-100">
            <h2 className="text-xs font-bold text-gray-500 tracking-wider mb-3">DELIVERY ADDRESS</h2>
            <div className="text-sm text-gray-800 leading-relaxed">
              <div className="font-bold text-gray-900 mb-1">{order.customerInfo.firstName} {order.customerInfo.lastName}</div>
              <div>{order.customerInfo.address}</div>
              {order.customerInfo.apartment && <div>{order.customerInfo.apartment}</div>}
              <div>{order.customerInfo.city}, {order.customerInfo.state} - {order.customerInfo.pincode}</div>
              <div className="mt-2 text-gray-600">📞 {order.customerInfo.phone}</div>
            </div>
          </div>
          
          <div className="flex-1 p-6 border-b border-gray-100">
            <h2 className="text-xs font-bold text-gray-500 tracking-wider mb-3">PAYMENT INFORMATION</h2>
            <div className="text-sm text-gray-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Method</span>
                <span className="font-bold">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className={`font-bold ${order.paymentMethod === 'cod' && stepIndex < 3 ? 'text-orange-600' : 'text-green-600'}`}>
                  {order.paymentMethod === 'cod' && stepIndex < 3 ? '○ Pending' : '✓ Paid'}
                </span>
              </div>
              {order.paymentMethod !== 'cod' && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Transaction ID</span>
                  <span className="font-mono text-xs mt-0.5 text-gray-600">TXN{orderId}9X</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Price Details */}
        <div className="p-6 bg-gray-50/50">
          <h2 className="text-xs font-bold text-gray-500 tracking-wider mb-4">PRICE DETAILS</h2>
          <div className="max-w-xs ml-auto space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{order.summary.subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>
              <span>{order.summary.delivery > 0 ? `₹${order.summary.delivery}` : <span className="text-green-600 font-bold">FREE</span>}</span>
            </div>
            {order.summary.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{order.summary.discount}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200 mt-2">
              <span>Total</span>
              <span>₹{order.summary.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-center sm:justify-end flex-wrap">
        {stepIndex < 3 && (
          <button className="px-6 py-2.5 text-sm bg-primary hover:bg-[#c2410c] text-white rounded-lg font-bold transition-all shadow-sm">
            Track Order Live
          </button>
        )}
        <button onClick={() => navigate("/store")} className="px-6 py-2.5 text-sm bg-orange-50 hover:bg-orange-100 text-[#c2410c] border border-orange-200 rounded-lg font-bold transition-all shadow-sm">
          Reorder Items
        </button>
        <button className="px-6 py-2.5 text-sm bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 rounded-lg font-bold transition-all shadow-sm">
          Need Help?
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
