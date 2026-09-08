import React, { useState } from "react";

const DeliveryCheck = () => {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleCheck = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      // Simulate API check
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="delivery-check" style={{ marginTop: '20px', padding: '15px', border: '1px solid var(--border-color)', borderRadius: '8px', background: '#f8fafc' }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: 'var(--text-dark)' }}>Check Delivery Availability</h3>
      
      <form onSubmit={handleCheck} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input 
          type="text" 
          placeholder="Enter PIN Code" 
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          style={{ flex: 1, padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px' }}
        />
        <button 
          type="submit" 
          className="primary-button" 
          style={{ padding: '10px 20px', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}
        >
          Check
        </button>
      </form>

      {status === "success" && (
        <div style={{ color: 'green', fontSize: '14px' }}>
          <div style={{ fontWeight: 'bold' }}>✓ Delivery available</div>
          <div>Estimated delivery: 2–4 days</div>
        </div>
      )}
      
      {status === "error" && (
        <div style={{ color: '#ff4757', fontSize: '14px' }}>
          Please enter a valid 6-digit PIN code.
        </div>
      )}
    </div>
  );
};

export default DeliveryCheck;
