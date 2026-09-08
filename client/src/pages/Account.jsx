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
    <div className="account-page" style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ marginBottom: "30px", color: "var(--text-dark)" }}>My Account</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "30px", alignItems: "start" }}>
        
        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Account Navigation */}
          <div style={{ background: "white", padding: "10px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <h3 style={{ padding: "10px 15px", margin: "0 0 5px 0", fontSize: "16px", color: "var(--text-light)" }}>My Account</h3>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "12px 15px", display: "flex", alignItems: "center", gap: "12px", fontWeight: "600", color: "var(--primary-color)", background: "#f8fafc", borderRadius: "8px", cursor: "pointer" }}>👤 Profile</div>
              <div style={{ padding: "12px 15px", display: "flex", alignItems: "center", gap: "12px", fontWeight: "500", color: "var(--text-dark)", cursor: "pointer" }}>📍 Addresses</div>
              <Link to="/orders" style={{ padding: "12px 15px", display: "flex", alignItems: "center", gap: "12px", fontWeight: "500", color: "var(--text-dark)", cursor: "pointer", textDecoration: "none" }}>📦 Orders</Link>
              <Link to="/wishlist" style={{ padding: "12px 15px", display: "flex", alignItems: "center", gap: "12px", fontWeight: "500", color: "var(--text-dark)", cursor: "pointer", textDecoration: "none" }}>❤️ Wishlist</Link>
              <div style={{ padding: "12px 15px", display: "flex", alignItems: "center", gap: "12px", fontWeight: "500", color: "var(--text-dark)", cursor: "pointer" }}>🎁 Offers</div>
              <div style={{ padding: "12px 15px", display: "flex", alignItems: "center", gap: "12px", fontWeight: "500", color: "var(--text-dark)", cursor: "pointer" }}>⚙️ Settings</div>
              <div style={{ padding: "12px 15px", display: "flex", alignItems: "center", gap: "12px", fontWeight: "500", color: "#ef4444", cursor: "pointer", marginTop: "10px", borderTop: "1px solid var(--border-color)" }}>🚪 Logout</div>
            </div>
          </div>

          {/* Profile Completion */}
          <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "15px", color: "var(--text-dark)" }}>Complete your profile</h3>
            
            <div style={{ marginBottom: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>
                <span>Progress</span>
                <span>{completionPercentage}%</span>
              </div>
              <div style={{ height: "8px", background: "#e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: `${completionPercentage}%`, height: "100%", background: "var(--primary-color)" }}></div>
              </div>
            </div>

            <div style={{ fontSize: "14px", color: "var(--text-light)", marginBottom: "20px" }}>
              <strong style={{ display: "block", marginBottom: "8px", color: "var(--text-dark)" }}>Missing:</strong>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", color: "#16a34a" }}>
                <span>✓</span> Name
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", color: "#16a34a" }}>
                <span>✓</span> Email
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", color: hasPhone ? "#16a34a" : "#ef4444" }}>
                <span>{hasPhone ? "✓" : "✗"}</span> Phone number
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: addresses.length > 0 ? "#16a34a" : "#ef4444" }}>
                <span>{addresses.length > 0 ? "✓" : "✗"}</span> Shipping address
              </div>
            </div>

            {completionPercentage < 100 && (
              <button style={{ width: "100%", padding: "10px", background: "var(--primary-color)", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
                Complete Profile
              </button>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          
          {/* Profile Details */}
          <div style={{ background: "white", padding: "30px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "20px", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>Personal Information</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "var(--text-light)", marginBottom: "4px" }}>Name</label>
                <div style={{ fontWeight: "500", color: "var(--text-dark)" }}>Dinesh Sivalanka</div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "var(--text-light)", marginBottom: "4px" }}>Email</label>
                <div style={{ fontWeight: "500", color: "var(--text-dark)" }}>dinesh@example.com</div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "var(--text-light)", marginBottom: "4px" }}>Phone number</label>
                {hasPhone ? (
                  <div style={{ fontWeight: "500", color: "var(--text-dark)" }}>+91 98765 43210</div>
                ) : (
                  <div>
                    <span style={{ color: "#ef4444", fontWeight: "500", marginRight: "10px" }}>Not added yet</span>
                    <button onClick={() => setHasPhone(true)} style={{ background: "transparent", color: "var(--primary-color)", border: "1px solid var(--primary-color)", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", cursor: "pointer", fontWeight: "bold" }}>
                      Add phone number
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Saved Addresses */}
          <div style={{ background: "white", padding: "30px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "20px", margin: "0" }}>Saved Addresses</h2>
              {addresses.length > 0 && (
                <button onClick={() => setShowAddressForm(true)} style={{ background: "transparent", color: "var(--primary-color)", border: "none", cursor: "pointer", fontWeight: "bold" }}>
                  + Add New
                </button>
              )}
            </div>

            {addresses.length === 0 && !showAddressForm ? (
              <div style={{ background: "#f8fafc", padding: "30px", borderRadius: "8px", border: "1px dashed #cbd5e1" }}>
                <h3 style={{ marginBottom: "15px", color: "var(--text-dark)" }}>No saved addresses yet.</h3>
                <p style={{ color: "var(--text-light)", marginBottom: "15px" }}>Save your address to:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px", color: "var(--text-dark)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ color: "#16a34a" }}>✓</span> Checkout faster</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ color: "#16a34a" }}>✓</span> Avoid typing repeatedly</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ color: "#16a34a" }}>✓</span> Manage multiple delivery locations</div>
                </div>
                <button onClick={() => setShowAddressForm(true)} style={{ padding: "10px 20px", background: "white", color: "var(--primary-color)", border: "1px solid var(--primary-color)", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
                  + Add New Address
                </button>
              </div>
            ) : showAddressForm ? (
              <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                <h3 style={{ marginBottom: "15px" }}>Add New Address</h3>
                <form onSubmit={handleAddAddress}>
                  <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontSize: "13px" }}>Full Name</label>
                    <input type="text" defaultValue="Dinesh Sivalanka" required style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)" }} />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontSize: "13px" }}>Address</label>
                    <textarea required defaultValue="Pune, Maharashtra, 411002" rows="3" style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)" }}></textarea>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button type="button" onClick={() => setShowAddressForm(false)} style={{ padding: "8px 15px", background: "transparent", border: "1px solid var(--border-color)", borderRadius: "4px", cursor: "pointer" }}>Cancel</button>
                    <button type="submit" style={{ padding: "8px 15px", background: "var(--primary-color)", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Save Address</button>
                  </div>
                </form>
              </div>
            ) : (
              <div style={{ display: "grid", gap: "20px" }}>
                {addresses.map(addr => (
                  <div key={addr.id} style={{ border: "1px solid var(--border-color)", borderRadius: "8px", padding: "20px", position: "relative" }}>
                    {addr.isDefault && (
                      <span style={{ position: "absolute", top: "20px", right: "20px", background: "#f0fdf4", color: "#16a34a", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>
                        Default
                      </span>
                    )}
                    <div style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ background: "#e2e8f0", padding: "2px 8px", borderRadius: "4px", fontSize: "12px" }}>{addr.label}</span>
                      {addr.name}
                    </div>
                    <div style={{ color: "var(--text-light)", marginBottom: "5px" }}>{addr.phone}</div>
                    <div style={{ color: "var(--text-light)", marginBottom: "20px" }}>{addr.address}</div>
                    
                    <div style={{ display: "flex", gap: "15px", borderTop: "1px solid var(--border-color)", paddingTop: "15px" }}>
                      <button style={{ background: "transparent", border: "none", color: "var(--primary-color)", fontWeight: "600", cursor: "pointer" }}>Edit</button>
                      <button style={{ background: "transparent", border: "none", color: "#ef4444", fontWeight: "600", cursor: "pointer" }} onClick={() => setAddresses([])}>Delete</button>
                      {!addr.isDefault && (
                        <button style={{ background: "transparent", border: "none", color: "var(--text-dark)", fontWeight: "600", cursor: "pointer" }}>Set as Default</button>
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
