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
    <div className="mt-10 pt-10 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
      
      <div className="flex flex-col md:flex-row gap-10 my-5 md:items-center">
        <div className="text-center md:text-left">
          <div className="text-3xl font-bold text-gray-900">⭐ {product.rating} / 5</div>
          <div className="text-gray-500 mt-1 font-medium">{product.reviews} Reviews</div>
        </div>

        <div className="flex-1 max-w-[300px] w-full mx-auto md:mx-0">
          {[
            { stars: 5, pct: 82 },
            { stars: 4, pct: 12 },
            { stars: 3, pct: 4 },
            { stars: 2, pct: 1 },
            { stars: 1, pct: 1 }
          ].map((bar) => (
            <div key={bar.stars} className="flex items-center gap-2.5 mb-1.5">
              <span className="w-[85px] shrink-0 text-yellow-400 tracking-widest text-sm">
                {"★".repeat(bar.stars)}{"☆".repeat(5 - bar.stars)}
              </span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400"
                  style={{ width: `${bar.pct}%` }}
                ></div>
              </div>
              <span className="w-10 text-right text-sm text-gray-500 font-medium">{bar.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {mockReviews.map(review => (
          <div key={review.id} className="p-5 border border-gray-200 rounded-lg bg-white shadow-sm">
            <div className="flex justify-between mb-2.5">
              <div>
                {/* Author moved to bottom for Verified Customer style */}
              </div>
              <div className="text-gray-500 text-sm font-medium">{review.date}</div>
            </div>
            <div className="text-yellow-400 mb-2.5 text-sm">
              {"⭐".repeat(review.rating)}
            </div>
            <p className="m-0 text-gray-900 leading-relaxed italic text-lg">"{review.text}"</p>
            {review.verified && (
              <div className="mt-2.5 text-gray-500 text-sm font-medium">
                — {review.author} <span className="text-green-600 ml-1 font-bold">✓</span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {hasPurchased ? (
        <button className="w-full py-3 mt-5 bg-white border border-primary text-primary hover:bg-primary/5 rounded-lg font-bold cursor-pointer transition-colors">
          Write a Review
        </button>
      ) : (
        <div className="mt-5 p-4 bg-gray-50 rounded-lg text-center text-gray-500 border border-gray-200 font-medium">
          Only verified purchasers should be allowed to leave a Verified Purchase review.
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
