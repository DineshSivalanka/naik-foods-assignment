import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("naikFoodsCart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "naikFoodsCart",
      JSON.stringify(cart)
    );
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const qtyToAdd = Math.max(1, Number(quantity) || 1);
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + qtyToAdd,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: qtyToAdd,
        },
      ];
    });
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item._id !== id)
    );
  };

  const restoreItem = (restoredItem) => {
    setCart((currentCart) => {
      // Check if it somehow already exists
      const exists = currentCart.find((item) => item._id === restoredItem._id);
      if (exists) return currentCart;
      
      return [...currentCart, restoredItem];
    });
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        restoreItem,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
