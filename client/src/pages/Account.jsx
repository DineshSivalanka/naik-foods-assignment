import React, { useState } from "react";
import { Link } from "react-router-dom";

const Account = () => {
  const [hasPhone, setHasPhone] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const completionPercentage = (hasPhone ? 25 : 0) + (addresses.length > 0 ? 25 : 0) + 50; // Base 50 for Name & Email

  const handleAddAddress = (e) => {
    e.preventDefault();
    setAddresses([
      {
        id: Date.now(),
        label: "Home",
        name: "Dinesh Sivalanka",
        phone: "+91 98765 43210",
        address: "Pune, Maharashtra, 411002",
        isDefault: true
      }
    ]);
    setShowAddressForm(false);
  };

  return (
    <div className="max-w-[1000px] mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start">
        
        {/* Sidebar */}
        <div className="flex flex-col gap-5">
          
          {/* Account Navigation */}
          <div className="bg-white p-2.5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="px-4 py-2.5 m-0 mb-1 text-base font-bold text-gray-500 uppercase tracking-wider text-xs">My Account</h3>
            <div className="flex flex-col">
              <div className="px-4 py-3 flex items-center gap-3 font-semibold text-primary bg-gray-50 rounded-lg cursor-pointer transition-colors">👤 Profile</div>
              <div className="px-4 py-3 flex items-center gap-3 font-medium text-gray-800 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">📍 Addresses</div>
              <Link to="/orders" className="px-4 py-3 flex items-center gap-3 font-medium text-gray-800 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors no-underline">📦 Orders</Link>
              <Link to="/wishlist" className="px-4 py-3 flex items-center gap-3 font-medium text-gray-800 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors no-underline">❤️ Wishlist</Link>
              <div className="px-4 py-3 flex items-center gap-3 font-medium text-gray-800 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">🎁 Offers</div>
              <div className="px-4 py-3 flex items-center gap-3 font-medium text-gray-800 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">⚙️ Settings</div>
              <div className="px-4 py-3 flex items-center gap-3 font-medium text-red-500 hover:bg-red-50 rounded-lg cursor-pointer mt-2.5 border-t border-gray-200">🚪 Logout</div>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Complete your profile</h3>
            
            <div className="mb-4">
              <div className="flex justify-between mb-1.5 text-sm font-bold text-gray-700">
                <span>Progress</span>
                <span>{completionPercentage}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-500" style={{ width: `${completionPercentage}%` }}></div>
              </div>
            </div>

            <div className="text-sm text-gray-500 mb-5">
              <strong className="block mb-2 text-gray-900">Missing:</strong>
              <div className="flex items-center gap-2 mb-1 text-green-600">
                <span>✓</span> Name
              </div>
              <div className="flex items-center gap-2 mb-1 text-green-600">
                <span>✓</span> Email
              </div>
              <div className={`flex items-center gap-2 mb-1 ${hasPhone ? "text-green-600" : "text-red-500"}`}>
                <span>{hasPhone ? "✓" : "✗"}</span> Phone number
              </div>
              <div className={`flex items-center gap-2 ${addresses.length > 0 ? "text-green-600" : "text-red-500"}`}>
                <span>{addresses.length > 0 ? "✓" : "✗"}</span> Shipping address
              </div>
            </div>

            {completionPercentage < 100 && (
              <button className="w-full py-2.5 bg-primary hover:bg-[#c2410c] text-white rounded-lg font-bold transition-colors">
                Complete Profile
              </button>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col gap-8">
          
          {/* Profile Details */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold mb-5 pb-2.5 border-b border-gray-200 text-gray-900">Personal Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-500 mb-1 font-medium">Name</label>
                <div className="font-semibold text-gray-900">Dinesh Sivalanka</div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1 font-medium">Email</label>
                <div className="font-semibold text-gray-900">dinesh@example.com</div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1 font-medium">Phone number</label>
                {hasPhone ? (
                  <div className="font-semibold text-gray-900">+91 98765 43210</div>
                ) : (
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-red-500 font-semibold">Not added yet</span>
                    <button onClick={() => setHasPhone(true)} className="bg-white text-primary border border-primary hover:bg-primary/5 px-2 py-1 rounded text-xs font-bold transition-colors">
                      Add phone number
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Saved Addresses */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2.5 mb-5">
              <h2 className="text-xl font-bold text-gray-900 m-0">Saved Addresses</h2>
              {addresses.length > 0 && (
                <button onClick={() => setShowAddressForm(true)} className="bg-transparent text-primary hover:text-[#c2410c] border-none cursor-pointer font-bold transition-colors">
                  + Add New
                </button>
              )}
            </div>

            {addresses.length === 0 && !showAddressForm ? (
              <div className="bg-gray-50 p-8 rounded-lg border border-dashed border-gray-300">
                <h3 className="mb-4 text-gray-900 font-bold text-lg">No saved addresses yet.</h3>
                <p className="text-gray-500 mb-4 font-medium">Save your address to:</p>
                <div className="flex flex-col gap-2 mb-6 text-gray-800 font-medium">
                  <div className="flex items-center gap-2.5"><span className="text-green-600 font-bold">✓</span> Checkout faster</div>
                  <div className="flex items-center gap-2.5"><span className="text-green-600 font-bold">✓</span> Avoid typing repeatedly</div>
                  <div className="flex items-center gap-2.5"><span className="text-green-600 font-bold">✓</span> Manage multiple delivery locations</div>
                </div>
                <button onClick={() => setShowAddressForm(true)} className="px-5 py-2.5 bg-white text-primary hover:bg-primary/5 border border-primary rounded-lg font-bold transition-colors">
                  + Add New Address
                </button>
              </div>
            ) : showAddressForm ? (
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="mb-4 font-bold text-lg text-gray-900">Add New Address</h3>
                <form onSubmit={handleAddAddress}>
                  <div className="mb-4">
                    <label className="block mb-1.5 text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" defaultValue="Dinesh Sivalanka" required className="w-full p-2.5 rounded border border-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1.5 text-sm font-medium text-gray-700">Address</label>
                    <textarea required defaultValue="Pune, Maharashtra, 411002" rows="3" className="w-full p-2.5 rounded border border-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"></textarea>
                  </div>
                  <div className="flex gap-2.5">
                    <button type="button" onClick={() => setShowAddressForm(false)} className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 rounded text-gray-700 font-medium transition-colors">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-primary hover:bg-[#c2410c] text-white border-none rounded font-bold transition-colors">Save Address</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="grid gap-5">
                {addresses.map(addr => (
                  <div key={addr.id} className="border border-gray-200 rounded-lg p-5 relative bg-white">
                    {addr.isDefault && (
                      <span className="absolute top-5 right-5 bg-green-50 text-green-600 px-2.5 py-1 rounded text-xs font-bold border border-green-100">
                        Default
                      </span>
                    )}
                    <div className="font-bold text-base mb-2.5 flex items-center gap-2.5 text-gray-900">
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-600 border border-gray-200 uppercase tracking-wide">{addr.label}</span>
                      {addr.name}
                    </div>
                    <div className="text-gray-500 mb-1 font-medium">{addr.phone}</div>
                    <div className="text-gray-500 mb-5">{addr.address}</div>
                    
                    <div className="flex gap-4 border-t border-gray-200 pt-4">
                      <button className="bg-transparent border-none text-primary hover:text-[#c2410c] font-semibold cursor-pointer transition-colors text-sm">Edit</button>
                      <button className="bg-transparent border-none text-red-500 hover:text-red-600 font-semibold cursor-pointer transition-colors text-sm" onClick={() => setAddresses([])}>Delete</button>
                      {!addr.isDefault && (
                        <button className="bg-transparent border-none text-gray-700 hover:text-gray-900 font-semibold cursor-pointer transition-colors text-sm">Set as Default</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
