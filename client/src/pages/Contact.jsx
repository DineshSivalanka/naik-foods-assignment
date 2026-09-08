import React from "react";

const Contact = () => {
  return (
    <div className="contact-page" style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "var(--text-dark)" }}>
        Contact Us
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        {/* Contact Form */}
        <div style={{ background: "#f8fafc", padding: "30px", borderRadius: "12px" }}>
          <form onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "var(--text-dark)" }}>Name</label>
              <input type="text" required style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid var(--border-color)" }} />
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "var(--text-dark)" }}>Email</label>
              <input type="email" required style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid var(--border-color)" }} />
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "var(--text-dark)" }}>Message</label>
              <textarea required rows="5" style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid var(--border-color)", resize: "vertical" }}></textarea>
            </div>
            
            <button type="submit" className="primary-button" style={{ width: "100%", padding: "12px", fontSize: "16px", background: "var(--primary-color)", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information & Map Placeholder */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ background: "white", padding: "20px", border: "1px solid var(--border-color)", borderRadius: "12px" }}>
            <h3 style={{ marginBottom: "15px", color: "var(--text-dark)" }}>Get In Touch</h3>
            <p style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", color: "var(--text-light)" }}>
              <span style={{ fontSize: "20px" }}>📍</span> 123 Food Street, Culinary District
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", color: "var(--text-light)" }}>
              <span style={{ fontSize: "20px" }}>📞</span> +91 98765 43210
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-light)" }}>
              <span style={{ fontSize: "20px" }}>✉️</span> hello@naikfoods.com
            </p>
          </div>

          <div style={{ flex: 1, background: "#e2e8f0", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "250px", border: "1px dashed #cbd5e1" }}>
            <p style={{ color: "#64748b", fontWeight: "500" }}>[ Map Placeholder ]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
