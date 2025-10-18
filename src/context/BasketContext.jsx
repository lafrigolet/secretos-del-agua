import React, { createContext, useContext, useState } from "react";

const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [basket, setBasket] = useState([]);

  // 🛒 Add product (with size & price)
  const addToBasket = (product, size, price) => {
    setBasket((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id && item.size === size
      );

      if (exists) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, size, price, quantity: 1 }];
    });
  };

  const decreaseQuantity = (productId, size) => {
    setBasket((prev) =>
      prev
        .map((item) =>
          item.id === productId && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromBasket = (productId, size) => {
    setBasket((prev) =>
      prev.filter((item) => !(item.id === productId && item.size === size))
    );
  };

  const total = basket.reduce((sum, item) => {
    const priceNumber =
      parseFloat(item.price?.replace(/[^\d,.-]/g, "").replace(",", ".")) || 0;
    return sum + priceNumber * item.quantity;
  }, 0);

  return (
    <BasketContext.Provider
      value={{
        basket,
        addToBasket,
        decreaseQuantity,
        removeFromBasket,
        total,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  return useContext(BasketContext);
}
