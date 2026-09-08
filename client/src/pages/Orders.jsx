import React, { useState } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  // Using a mock state to switch between empty and filled states for prototype demonstration
  const [hasOrders, setHasOrders] = useState(true);
  const [trackingOrder, setTrackingOrder] = useState(null);

  const mockOrders = [
    {
      id: "NF10245",
      date: "Sep 8, 2026",
      total: 1174,
      status: "Shipped", // Status can be: Confirmed, Packed, Shipped, OutForDelivery, Delivered
    }
  ];

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
      <div style={{ background: "white", padding: "30px", borderRadius: "12px", border: "1px solid var(--border-color)", marginTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", borderBottom: "1px solid var(--border-color)", paddingBottom: "15px" }}>
          <h2 style={{ fontSize: "20px", color: "var(--text-dark)", margin: 0 }}>Track Order #{order.id}</h2>
          <button onClick={() => setTrackingOrder(null)} style={{ background: "transparent", border: "none", color: "var(--primary-color)", fontWeight: "bold", cursor: "pointer" }}>
            &larr; Back to Orders
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0", position: "relative", paddingLeft: "20px" }}>
          {/* Vertical Line connecting nodes */}
          <div style={{ position: "absolute", left: "34px", top: "20px", bottom: "20px", width: "2px", background: "#e2e8f0", zIndex: 0 }}></div>

          {steps.map((step, index) => {
            const isCompleted = index <= currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <div key={index} style={{ display: "flex", alignItems: "center", gap: "20px", padding: "15px 0", position: "relative", zIndex: 1 }}>
                <div style={{ 
                  width: "30px", height: "30px", borderRadius: "50%", 
                  background: isCompleted ? "var(--primary-color)" : "white", 
                  border: isCompleted ? "2px solid var(--primary-color)" : "2px solid #cbd5e1",
                  color: isCompleted ? "white" : "#94a3b8",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "14px", fontWeight: "bold"
                }}>
                  {isCompleted ? "✓" : (isCurrent ? "●" : "○")}
                </div>
                <div style={{ fontSize: "16px", fontWeight: isCurrent ? "bold" : "500", color: isCompleted ? "var(--text-dark)" : "#64748b" }}>
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
    <div className="orders-page" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "var(--text-dark)", margin: 0 }}>My Orders</h1>
        {/* Toggle button strictly for demonstration purposes */}
        <button onClick={() => setHasOrders(!hasOrders)} style={{ fontSize: "12px", background: "#f1f5f9", border: "1px solid #cbd5e1", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>
          Toggle Empty State
        </button>
      </div>

      {!hasOrders ? (
        <div style={{ background: "white", padding: "50px 20px", borderRadius: "12px", border: "1px solid var(--border-color)", textAlign: "center" }}>
          <div style={{ fontSize: "40px", marginBottom: "15px" }}>🍪</div>
          <h2 style={{ fontSize: "24px", color: "var(--text-dark)", marginBottom: "10px" }}>No orders yet</h2>
          <p style={{ color: "var(--primary-color)", fontWeight: "bold", fontSize: "18px", marginBottom: "15px" }}>Your delicious journey starts here!</p>
          <p style={{ color: "var(--text-light)", marginBottom: "30px" }}>Explore our snacks, pickles and traditional foods.</p>
          <Link to="/store" className="primary-button" style={{ display: "inline-block", padding: "12px 24px", textDecoration: "none" }}>
            Start Shopping
          </Link>
        </div>
      ) : trackingOrder ? (
        renderTracker(trackingOrder)
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {mockOrders.map(order => {
            const stepIndex = getStatusIndex(order.status);
            return (
              <div key={order.id} style={{ background: "white", padding: "25px", borderRadius: "12px", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #f1f5f9", paddingBottom: "15px" }}>
                  <div>
                    <h3 style={{ fontSize: "18px", color: "var(--text-dark)", marginBottom: "5px" }}>Order #{order.id}</h3>
                    <div style={{ fontSize: "14px", color: "var(--text-light)" }}>Placed: {order.date}</div>
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: "bold", color: "var(--text-dark)" }}>
                    ₹{order.total}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "15px", color: "var(--text-dark)", fontWeight: "500", fontSize: "14px" }}>
                  <span style={{ color: stepIndex >= 0 ? "#16a34a" : "#cbd5e1" }}>{stepIndex >= 0 ? "✓" : "○"} Confirmed</span>
                  <span style={{ color: stepIndex >= 1 ? "#16a34a" : "#cbd5e1" }}>{stepIndex >= 1 ? "✓" : "○"} Packed</span>
                  <span style={{ color: stepIndex >= 2 ? "var(--primary-color)" : "#cbd5e1" }}>{stepIndex >= 2 ? (stepIndex === 2 ? "●" : "✓") : "○"} Shipped</span>
                  <span style={{ color: stepIndex >= 4 ? "#16a34a" : "#cbd5e1" }}>{stepIndex >= 4 ? "✓" : "○"} Delivered</span>
                </div>

                <div style={{ display: "flex", gap: "15px", marginTop: "5px" }}>
                  <button onClick={() => setTrackingOrder(order)} className="primary-button" style={{ padding: "8px 20px", fontSize: "14px", background: "var(--primary-color)", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
                    Track Order
                  </button>
                  <button style={{ padding: "8px 20px", fontSize: "14px", background: "white", color: "var(--text-dark)", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>
                    View Details
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
