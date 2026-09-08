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

  return (
    <div className="filter-bar">

      <AutocompleteSearch
        value={filters.search}
        onChange={handleChange}
        onSelect={onSearch}
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

      <select
        name="availability"
        value={filters.availability || ""}
        onChange={handleChange}
      >
        <option value="">Availability (All)</option>
        <option value="in-stock">In Stock</option>
        <option value="out-of-stock">Out of Stock</option>
      </select>

      <button onClick={onSearch}>
        Search
      </button>

      <button
        type="button"
        className="reset-button"
        onClick={handleReset}
      >
        Reset
      </button>

    </div>
  );
};

export default FilterBar;
