import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trackingOrder, setTrackingOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const clientId = localStorage.getItem("naikFoodsClientId") || "anonymous";
        const data = await getOrders(clientId);
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusIndex = (status) => {
    const statuses = ["Confirmed", "Packed", "Shipped", "OutForDelivery", "Delivered"];
    return statuses.indexOf(status);
  };

  const renderTracker = (order) => {
    const currentStep = getStatusIndex(order.status);
    const steps = [
      { label: "Order Confirmed", icon: "✓" },
      { label: "Packed", icon: "✓" },
      { label: "Shipped", icon: "●" },
      { label: "Out for Delivery", icon: "○" },
      { label: "Delivered", icon: "○" }
    ];

    return (
      <div className="bg-white p-8 rounded-xl border border-gray-200 mt-5 shadow-sm">
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-xl text-gray-900 m-0 font-bold">Track Order #{order.id}</h2>
          <button onClick={() => setTrackingOrder(null)} className="bg-transparent border-none text-primary font-bold cursor-pointer hover:text-[#c2410c] transition-colors">
            &larr; Back to Orders
          </button>
        </div>

        <div className="flex flex-col gap-0 relative pl-5">
          {/* Vertical Line connecting nodes */}
          <div className="absolute left-[34px] top-5 bottom-5 w-[2px] bg-gray-200 z-0"></div>

          {steps.map((step, index) => {
            const isCompleted = index <= currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <div key={index} className="flex items-center gap-5 py-4 relative z-10">
                <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                  isCompleted 
                    ? "bg-primary border-primary text-white" 
                    : "bg-white border-gray-300 text-gray-400"
                }`}>
                  {isCompleted ? "✓" : (isCurrent ? "●" : "○")}
                </div>
                <div className={`text-base ${isCurrent ? "font-bold" : "font-medium"} ${isCompleted ? "text-gray-900" : "text-gray-500"}`}>
                  {step.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[800px] mx-auto px-5 py-10 min-h-[70vh] flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 m-0">My Orders</h1>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500 font-medium">Loading your orders...</div>
      ) : orders.length === 0 ? (
        <div className="bg-white py-12 px-5 rounded-xl border border-gray-200 text-center shadow-sm">
          <div className="text-5xl mb-4">🍪</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2.5">No orders yet</h2>
          <p className="text-primary font-bold text-lg mb-4">Your delicious journey starts here!</p>
          <p className="text-gray-500 mb-8">Explore our snacks, pickles and traditional foods.</p>
          <Link to="/store" className="inline-block px-6 py-3 bg-primary hover:bg-[#c2410c] text-white font-semibold rounded-lg transition-colors text-decoration-none">
            Start Shopping
          </Link>
        </div>
      ) : trackingOrder ? (
        renderTracker(trackingOrder)
      ) : (
        <div className="flex flex-col gap-6 flex-1">
          {orders.map(order => {
            const stepIndex = getStatusIndex(order.status || "Confirmed");
            const orderId = order._id.slice(-6).toUpperCase();
            const date = new Date(order.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
            
            // Calculate estimated delivery
            const estDate = new Date(order.createdAt);
            estDate.setDate(estDate.getDate() + 3);
            const estDateEnd = new Date(estDate);
            estDateEnd.setDate(estDateEnd.getDate() + 1);
            const estDeliveryStr = `${estDate.toLocaleDateString("en-IN", { month: "short", day: "numeric" })}–${estDateEnd.toLocaleDateString("en-IN", { day: "numeric" })}`;
            
            // Product info string
            let productInfo = "Products";
            let productImg = null;
            if (order.products && order.products.length > 0) {
              const firstProduct = order.products[0].product;
              productInfo = firstProduct && firstProduct.name ? firstProduct.name : "Product";
              productImg = firstProduct && firstProduct.image ? firstProduct.image : null;
              if (order.products.length > 1) {
                productInfo += ` + ${order.products.length - 1} more items`;
              }
            }

            return (
              <div key={order._id} className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Order #{orderId}</h3>
                    <div className="text-sm text-gray-500 font-medium">Placed: {date}</div>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    ₹{order.summary.total}
                  </div>
                </div>

                <div className="flex items-center gap-5 my-2 w-full">
                  {productImg && (
                    <img src={productImg} alt="Product" className="w-[90px] h-[90px] object-cover rounded-xl border border-gray-200 shadow-sm" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"; }} />
                  )}
                  <div className="text-gray-900 font-semibold text-base sm:text-lg">
                    {productInfo}
                  </div>
                </div>

                {/* Desktop Tracking View */}
                <div className="hidden sm:flex items-center justify-between relative mt-4 mb-2 max-w-[500px]">
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gray-200 z-0"></div>
                  {['Confirmed', 'Packed', 'Shipped', 'Delivered'].map((step, idx) => {
                    const isCompleted = stepIndex >= idx;
                    const isCurrent = stepIndex === idx;
                    return (
                      <div key={step} className="flex flex-col items-center gap-2 bg-white px-3 relative z-10">
                        <div className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-colors ${
                          isCompleted ? (stepIndex === 3 ? 'bg-green-500 border-green-500 text-white' : 'bg-primary border-primary text-white') : 'bg-white border-gray-300 text-transparent'
                        }`}>
                          {isCompleted ? '✓' : (isCurrent ? '●' : '')}
                        </div>
                        <span className={`text-[13px] font-semibold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>{step}</span>
                      </div>
                    );
                  })}
                </div>
                
                {/* Mobile Tracking View */}
                <div className="sm:hidden flex flex-wrap gap-4 text-gray-900 font-medium text-sm">
                  <span className={`flex items-center gap-1.5 ${stepIndex >= 0 ? "text-primary font-bold" : "text-gray-400"}`}>{stepIndex >= 0 ? "✓" : "○"} Confirmed</span>
                  <span className={`flex items-center gap-1.5 ${stepIndex >= 1 ? "text-primary font-bold" : "text-gray-400"}`}>{stepIndex >= 1 ? "✓" : "○"} Packed</span>
                  <span className={`flex items-center gap-1.5 ${stepIndex >= 2 ? "text-primary font-bold" : "text-gray-400"}`}>{stepIndex >= 2 ? (stepIndex === 2 ? "●" : "✓") : "○"} Shipped</span>
                  <span className={`flex items-center gap-1.5 ${stepIndex >= 4 ? "text-green-600 font-bold" : "text-gray-400"}`}>{stepIndex >= 4 ? "✓" : "○"} Delivered</span>
                </div>

                <div className="text-gray-700 font-medium text-sm flex items-center gap-2 mt-1">
                  🚚 Estimated delivery: <span className="font-bold text-gray-900">{estDeliveryStr}</span>
                </div>

                <div className="flex flex-wrap gap-3 mt-3 pt-4 border-t border-gray-100">
                  <button onClick={() => setTrackingOrder(order)} className="px-6 py-2.5 text-sm bg-primary hover:bg-[#c2410c] text-white border-none rounded-lg cursor-pointer font-bold transition-all shadow-sm flex-1 sm:flex-none">
                    Track Order
                  </button>
                  <button onClick={() => navigate(`/orders/detail/${order._id}`)} className="px-6 py-2.5 text-sm bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 rounded-lg cursor-pointer font-bold transition-all shadow-sm flex-1 sm:flex-none">
                    View Details
                  </button>
                  <button className="px-6 py-2.5 text-sm bg-orange-50 hover:bg-orange-100 text-[#c2410c] border border-orange-200 rounded-lg cursor-pointer font-bold transition-all shadow-sm w-full sm:w-auto sm:ml-auto">
                    Reorder
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
