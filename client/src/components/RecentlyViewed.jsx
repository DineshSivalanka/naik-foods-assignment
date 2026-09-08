import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const RecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const loadRecentlyViewed = () => {
      try {
        const viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
        setRecentlyViewed(viewed);
      } catch (error) {
        console.error("Failed to load recently viewed items", error);
      }
    };

    loadRecentlyViewed();
    
    // Optional: listen for storage changes if you want it to update across tabs,
    // though usually not strictly necessary for a simple implementation.
    window.addEventListener("storage", loadRecentlyViewed);
    return () => window.removeEventListener("storage", loadRecentlyViewed);
  }, []);

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div id="recently-viewed" className="mt-8 pt-6 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Viewed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentlyViewed.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
