import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import RecentlyViewed from "../components/RecentlyViewed";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    minRating: "",
    sort: "",
    availability: "",
  });

  const fetchProducts = async (currentFilters = filters) => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts(currentFilters);

      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  const [hasRecentlyViewed, setHasRecentlyViewed] = useState(false);

  useEffect(() => {
    fetchProducts({});
    const viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    if (viewed.length > 0) {
      setHasRecentlyViewed(true);
    }
  }, []);

  return (
    <div className="store-page">

      <div className="store-header">
        <h1>Explore Our Products</h1>

        <p>
          Discover authentic flavors and traditional favorites.
        </p>

        {hasRecentlyViewed && (
          <button 
            className="secondary-button" 
            style={{ marginTop: '1rem' }}
            onClick={() => document.getElementById('recently-viewed')?.scrollIntoView({ behavior: 'smooth' })}
          >
            ↓ Jump to Recently Viewed
          </button>
        )}
      </div>

      <FilterBar
        filters={filters}
        setFilters={setFilters}
        onSearch={() => fetchProducts(filters)}
      />

      {!loading && !error && (
        <div className="result-count">
          {products.length} products found
        </div>
      )}

      {loading && (
        <div className="store-message">
          <div className="spinner"></div>
          <p>Loading delicious products...</p>
        </div>
      )}

      {!loading && error && (
        <div className="store-message error-message">
          <p>⚠️ {error}</p>

          <button onClick={() => fetchProducts(filters)}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="store-message">
          <div className="empty-icon">🔎</div>

          <h3>No products found</h3>

          <p>
            Try another search term or adjust your filters.
          </p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}

      <RecentlyViewed />

    </div>
  );
};

export default Store;
