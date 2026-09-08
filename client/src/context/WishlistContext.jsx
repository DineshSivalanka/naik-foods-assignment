import { createContext, useContext, useEffect, useState } from "react";
import { getWishlist, addToWishlist as apiAddToWishlist, removeFromWishlist as apiRemoveFromWishlist } from "../services/api";

const WishlistContext = createContext();

// Simple UUID generator for browser
const generateClientId = () => {
  return "client_" + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [clientId, setClientId] = useState(() => {
    let id = localStorage.getItem("naikFoodsClientId");
    if (!id) {
      id = generateClientId();
      localStorage.setItem("naikFoodsClientId", id);
    }
    return id;
  });

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

  const addToWishlist = async (productId) => {
    try {
      const data = await apiAddToWishlist(clientId, productId);
      if (data && data.products) {
        setWishlist(data.products);
      }
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const data = await apiRemoveFromWishlist(clientId, productId);
      if (data && data.products) {
        setWishlist(data.products);
      }
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
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
