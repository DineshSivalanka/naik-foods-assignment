import { createContext, useContext, useEffect, useState } from "react";
import { getWishlist, addToWishlist as apiAddToWishlist, removeFromWishlist as apiRemoveFromWishlist } from "../services/api";

const WishlistContext = createContext();

// Simple UUID generator for browser
const generateClientId = () => {
  return "client_" + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("naikFoodsWishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [clientId] = useState(() => {
    let id = localStorage.getItem("naikFoodsClientId");
    if (!id) {
      id = generateClientId();
      localStorage.setItem("naikFoodsClientId", id);
    }
    return id;
  });

  // Sync state to localStorage immediately
  useEffect(() => {
    try {
      localStorage.setItem("naikFoodsWishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to cache wishlist:", e);
    }
  }, [wishlist]);

  // Initial sync with backend
  useEffect(() => {
    if (clientId) {
      fetchWishlist();
    }
  }, [clientId]);

  const fetchWishlist = async () => {
    try {
      const data = await getWishlist(clientId);
      if (data && data.products) {
        setWishlist(data.products);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    }
  };

  const addToWishlist = async (productOrId) => {
    const productId = typeof productOrId === "object" ? productOrId._id : productOrId;
    const productObj = typeof productOrId === "object" ? productOrId : { _id: productId };

    // 1. Instant Optimistic Update (0ms UI latency)
    const previous = [...wishlist];
    if (!wishlist.some((item) => item._id === productId)) {
      setWishlist((prev) => [...prev, productObj]);
    }

    // 2. Background backend sync
    try {
      const data = await apiAddToWishlist(clientId, productId);
      if (data && data.products) {
        setWishlist(data.products);
      }
    } catch (error) {
      console.error("Failed to add to wishlist, reverting:", error);
      setWishlist(previous);
    }
  };

  const removeFromWishlist = async (productId) => {
    // 1. Instant Optimistic Update (0ms UI latency)
    const previous = [...wishlist];
    setWishlist((prev) => prev.filter((item) => item._id !== productId));

    // 2. Background backend sync
    try {
      const data = await apiRemoveFromWishlist(clientId, productId);
      if (data && data.products) {
        setWishlist(data.products);
      }
    } catch (error) {
      console.error("Failed to remove from wishlist, reverting:", error);
      setWishlist(previous);
    }
  };

  const isLiked = (productId) => {
    return wishlist.some((product) => product._id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isLiked,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
