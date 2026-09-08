import React, { useState, useEffect, useRef } from "react";
import { getProducts } from "../services/api";

const AutocompleteSearch = ({ value, onChange, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    // Close suggestions if clicked outside
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    
    // Call the parent onChange to update global filter state
    onChange({ target: { name: "search", value: val } });

    if (val.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        const data = await getProducts({ search: val });
        // Limit suggestions to top 5
        setSuggestions(data.slice(0, 5));
        setShowSuggestions(true);
      } catch (err) {
        console.error("Failed to fetch suggestions", err);
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms debounce
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setShowSuggestions(false);
    
    // Call the parent onChange to update global filter state with full name
    onChange({ target: { name: "search", value: suggestion.name } });
    
    // Trigger search
    if (onSelect) {
      onSelect(suggestion.name);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full flex-1">
      <input
        type="text"
        name="search"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
        autoComplete="off"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
      />
      
      {showSuggestions && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg z-50 list-none p-0 mt-1 shadow-lg max-h-[200px] overflow-y-auto">
          {loading && <li className="px-4 py-2.5 text-gray-500 text-sm">Loading...</li>}
          {!loading && suggestions.length === 0 && (
            <li className="px-4 py-2.5 text-gray-500 text-sm">No products found</li>
          )}
          {!loading && suggestions.map((item) => (
            <li 
              key={item._id} 
              onClick={() => handleSuggestionClick(item)}
              className="px-4 py-2.5 cursor-pointer border-b border-gray-100 last:border-b-0 text-gray-800 text-left hover:bg-gray-50 transition-colors"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteSearch;
