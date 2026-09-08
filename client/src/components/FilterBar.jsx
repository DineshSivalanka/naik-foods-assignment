const FilterBar = ({ filters, setFilters, onSearch }) => {
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

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      minRating: "",
      sort: "",
    });
  };

  return (
    <div className="filter-bar">

      <input
        type="text"
        name="search"
        placeholder="Search products..."
        value={filters.search}
        onChange={handleChange}
      />

      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
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
      />

      <input
        type="number"
        name="maxPrice"
        placeholder="Max ₹"
        value={filters.maxPrice}
        onChange={handleChange}
      />

      <select
        name="minRating"
        value={filters.minRating}
        onChange={handleChange}
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
      >
        <option value="">Newest</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
      </select>

      <button onClick={onSearch}>
        Search
      </button>

      <button
        className="reset-button"
        onClick={resetFilters}
      >
        Reset
      </button>

    </div>
  );
};

export default FilterBar;
