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
    <div className="autocomplete-wrapper" ref={wrapperRef} style={{ position: "relative", width: "100%", flex: "1" }}>
      <input
        type="text"
        name="search"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
        autoComplete="off"
        style={{ width: "100%", boxSizing: "border-box" }}
      />
      
      {showSuggestions && (
        <ul className="autocomplete-suggestions" style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "4px",
          zIndex: 1000,
          listStyle: "none",
          padding: 0,
          margin: "4px 0 0 0",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          maxHeight: "200px",
          overflowY: "auto"
        }}>
          {loading && <li style={{ padding: "8px 12px", color: "#888" }}>Loading...</li>}
          {!loading && suggestions.length === 0 && (
            <li style={{ padding: "8px 12px", color: "#888" }}>No products found</li>
          )}
          {!loading && suggestions.map((item) => (
            <li 
              key={item._id} 
              onClick={() => handleSuggestionClick(item)}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
                color: "#333",
                textAlign: "left"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#f5f5f5"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
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
