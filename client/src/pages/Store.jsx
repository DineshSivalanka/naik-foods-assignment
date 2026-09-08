import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import RecentlyViewed from "../components/RecentlyViewed";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

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
      setCurrentPage(1); // Reset to first page on new search
    } catch (err) {
      console.error(err);
      setError("Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const currentProducts = products.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <div className="max-w-[1300px] mx-auto px-[30px] pt-[60px] pb-[50px]">

      <div className="text-center mb-7">
        <h1 className="text-[42px] mb-3 font-bold text-gray-900">Explore Our Products</h1>

        <p className="text-lg text-gray-500">
          Discover authentic flavors and traditional favorites.
        </p>

        {hasRecentlyViewed && (
          <button 
            className="inline-block mt-4 bg-white text-gray-800 border-2 border-gray-200 py-2 px-5 rounded-lg font-semibold hover:border-primary hover:text-primary transition-colors text-sm" 
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
        onReset={(resetFilters) => fetchProducts(resetFilters)}
      />

      {!loading && !error && (
        <div className="mb-[18px] text-gray-500 font-medium text-base">
          {products.length} products found
        </div>
      )}

      {loading && (
        <div className="text-center py-16 flex flex-col items-center justify-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200 my-8">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
          <p>Loading delicious products...</p>
        </div>
      )}

      {!loading && error && (
        <div className="text-center py-16 flex flex-col items-center justify-center text-red-500 bg-red-50 rounded-xl border border-dashed border-red-200 my-8">
          <p className="mb-4">⚠️ {error}</p>

          <button onClick={() => fetchProducts(filters)} className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-[#c2410c] transition-colors">
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="text-center py-16 flex flex-col items-center justify-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200 my-8">
          <div className="text-5xl mb-4 opacity-50">🔎</div>

          <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>

          <p>
            Try another search term or adjust your filters.
          </p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {currentProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2.5 mb-[30px]">
              <button 
                disabled={currentPage === 1} 
                onClick={() => handlePageChange(currentPage - 1)}
                className="bg-white border border-gray-200 px-4 py-2 rounded-md font-medium text-gray-800 transition-colors disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed hover:not(:disabled):border-primary hover:not(:disabled):text-primary"
              >
                Prev
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`bg-white border border-gray-200 px-4 py-2 rounded-md font-medium text-gray-800 transition-colors hover:not(:disabled):border-primary hover:not(:disabled):text-primary ${currentPage === page ? "!bg-primary !border-primary !text-white" : ""}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}

              <button 
                disabled={currentPage === totalPages} 
                onClick={() => handlePageChange(currentPage + 1)}
                className="bg-white border border-gray-200 px-4 py-2 rounded-md font-medium text-gray-800 transition-colors disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed hover:not(:disabled):border-primary hover:not(:disabled):text-primary"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      <RecentlyViewed />

    </div>
  );
};

export default Store;
