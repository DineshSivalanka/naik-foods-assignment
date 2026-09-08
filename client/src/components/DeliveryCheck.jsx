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
    <div className="mt-5 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="m-0 mb-2.5 text-base text-gray-900 font-bold">Check Delivery Availability</h3>
      
      <form onSubmit={handleCheck} className="flex gap-2.5 mb-2.5">
        <input 
          type="text" 
          placeholder="Enter PIN Code" 
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className="flex-1 p-2.5 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
        <button 
          type="submit" 
          className="px-5 py-2.5 bg-primary hover:bg-[#c2410c] text-white border-none rounded font-semibold cursor-pointer transition-colors"
        >
          Check
        </button>
      </form>

      {status === "success" && (
        <div className="text-green-600 text-sm">
          <div className="font-bold">✓ Delivery available</div>
          <div>Estimated delivery: 2–4 days</div>
        </div>
      )}
      
      {status === "error" && (
        <div className="text-red-500 text-sm font-medium">
          Please enter a valid 6-digit PIN code.
        </div>
      )}
    </div>
  );
};

export default DeliveryCheck;
