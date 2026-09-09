import AutocompleteSearch from "./AutocompleteSearch";

const FilterBar = ({ filters, setFilters, onSearch, onReset }) => {
  // Update categories to match exactly with the database values
  const categories = [
    "Snacks & Namkeen",
    "Pickles & Condiments",
    "Sweets & Bakery",
    "Spices & Masalas",
    "Mukhvas & Digestives",
    "Dairy & Beverages",
    "Dry & Instant Grocery",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    const resetValues = {
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      minRating: "",
      sort: "",
      availability: "",
    };

    setFilters(resetValues);

    if (onReset) {
      onReset(resetValues);
    }
  };

  const inputClasses =
    "w-full p-3.5 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-800 transition-colors focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/15";

  return (
    <div className="mb-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input spans 2 columns on large screens for better UX */}
        <div className="lg:col-span-2">
          <AutocompleteSearch
            value={filters.search}
            onChange={handleChange}
            onSelect={onSearch}
          />
        </div>

        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          name="availability"
          value={filters.availability || ""}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="">Availability (All)</option>
          <option value="in-stock">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>

        <input
          type="number"
          name="minPrice"
          placeholder="Min Price (₹)"
          value={filters.minPrice}
          onChange={handleChange}
          className={inputClasses}
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price (₹)"
          value={filters.maxPrice}
          onChange={handleChange}
          className={inputClasses}
        />

        <select
          name="minRating"
          value={filters.minRating}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="">Any Rating</option>
          <option value="4">4★ & above</option>
          <option value="3">3★ & above</option>
          <option value="2">2★ & above</option>
        </select>

        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <div className="flex flex-wrap justify-end gap-3 mt-6 pt-5 border-t border-gray-100">
        <button
          type="button"
          className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 hover:-translate-y-px transition-all"
          onClick={handleReset}
        >
          Reset Filters
        </button>

        <button
          onClick={onSearch}
          className="px-8 py-2.5 rounded-lg bg-primary text-white font-medium shadow-sm hover:bg-[#c2410c] hover:-translate-y-px hover:shadow-md transition-all"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
