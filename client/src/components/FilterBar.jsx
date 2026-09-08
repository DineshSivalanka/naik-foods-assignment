import AutocompleteSearch from "./AutocompleteSearch";

const FilterBar = ({ filters, setFilters, onSearch, onReset }) => {
  const categories = [
    "Snacks",
    "Pickles",
    "Sweets",
    "Beverages",
    "Mukhvas",
    "Spices",
    "Grocery",
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

  const inputClasses = "w-full sm:w-auto flex-1 p-3.5 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-800 transition-colors focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/15";

  return (
    <div className="flex flex-wrap gap-4 mb-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">

      <AutocompleteSearch
        value={filters.search}
        onChange={handleChange}
        onSelect={onSearch}
      />

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

      <input
        type="number"
        name="minPrice"
        placeholder="Min ₹"
        value={filters.minPrice}
        onChange={handleChange}
        className={inputClasses}
      />

      <input
        type="number"
        name="maxPrice"
        placeholder="Max ₹"
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

      <button onClick={onSearch} className="px-6 py-3.5 rounded-lg bg-primary text-white font-medium hover:bg-[#c2410c] hover:-translate-y-px transition-all">
        Search
      </button>

      <button
        type="button"
        className="px-6 py-3.5 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-300 hover:-translate-y-px transition-all"
        onClick={handleReset}
      >
        Reset
      </button>

    </div>
  );
};

export default FilterBar;
