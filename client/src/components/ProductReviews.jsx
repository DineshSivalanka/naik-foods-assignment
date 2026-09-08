import React, { useState, useEffect } from "react";

const ProductReviews = ({ product }) => {
  const [hasPurchased, setHasPurchased] = useState(false);

  useEffect(() => {
    const purchased = JSON.parse(localStorage.getItem("purchasedItems") || "[]");
    setHasPurchased(purchased.includes(product._id));
  }, [product._id]);
  // Mock data for prototype
  const mockReviews = [
    {
      id: 1,
      author: "Verified Customer",
      rating: 5,
      date: "August 12, 2026",
      text: "Very tasty and fresh!",
      verified: true
    },
    {
      id: 2,
      author: "Rahul M.",
      rating: 4,
      date: "August 5, 2026",
      text: "Good quality, but a bit too spicy for my taste.",
      verified: true
    },
    {
      id: 3,
      author: "Anjali D.",
      rating: 5,
      date: "July 28, 2026",
      text: "Absolutely delicious. Will buy again!",
      verified: true
    }
  ];

  return (
    <div className="product-reviews" style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid var(--border-color)' }}>
      <h2>Customer Reviews</h2>
      
      <div className="reviews-summary" style={{ display: 'flex', gap: '40px', margin: '20px 0', alignItems: 'center' }}>
        <div className="rating-overall" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-dark)' }}>⭐ {product.rating} / 5</div>
          <div style={{ color: 'var(--text-light)', marginTop: '5px' }}>{product.reviews} Reviews</div>
        </div>

        <div className="rating-bars" style={{ flex: 1, maxWidth: '300px' }}>
          {[
            { stars: 5, pct: 82 },
            { stars: 4, pct: 12 },
            { stars: 3, pct: 4 },
            { stars: 2, pct: 1 },
            { stars: 1, pct: 1 }
          ].map((bar) => (
            <div key={bar.stars} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
              <span style={{ width: '45px', color: 'var(--secondary-color)' }}>
                {"★".repeat(bar.stars)}{"☆".repeat(5 - bar.stars)}
              </span>
              <div style={{ flex: 1, height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${bar.pct}%`, 
                  height: '100%', 
                  background: 'var(--secondary-color)' 
                }}></div>
              </div>
              <span style={{ width: '40px', textAlign: 'right', fontSize: '14px', color: 'var(--text-light)' }}>{bar.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="reviews-list" style={{ marginTop: '30px' }}>
        {mockReviews.map(review => (
          <div key={review.id} className="review-card" style={{ padding: '20px', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div>
                {/* Author moved to bottom for Verified Customer style */}
              </div>
              <div style={{ color: 'var(--text-light)', fontSize: '14px' }}>{review.date}</div>
            </div>
            <div style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>
              {"⭐".repeat(review.rating)}
            </div>
            <p style={{ margin: 0, color: 'var(--text-dark)', lineHeight: '1.5', fontStyle: 'italic' }}>"{review.text}"</p>
            {review.verified && (
              <div style={{ marginTop: '10px', color: 'var(--text-light)', fontSize: '13px' }}>
                — {review.author} <span style={{ color: '#16a34a', marginLeft: '4px' }}>✓</span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {hasPurchased ? (
        <button className="secondary-button" style={{ 
          width: '100%', 
          padding: '12px', 
          background: 'white', 
          border: '1px solid var(--primary-color)', 
          color: 'var(--primary-color)', 
          borderRadius: '8px', 
          fontWeight: '600', 
          cursor: 'pointer',
          marginTop: '10px'
        }}>
          Write a Review
        </button>
      ) : (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center', color: 'var(--text-light)', border: '1px solid var(--border-color)' }}>
          Only verified purchasers should be allowed to leave a Verified Purchase review.
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
