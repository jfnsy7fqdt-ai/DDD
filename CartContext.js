import React, { createContext, useContext, useEffect, useState, useRef } from "react";

// Simple cart context with localStorage persistence
const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const initialized = useRef(false);

  useEffect(() => {
    // hydrate from localStorage
    try {
      const raw = localStorage.getItem("dropify_cart_v1");
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {}
    initialized.current = true;
  }, []);

  useEffect(() => {
    if (!initialized.current) return;
    try {
      localStorage.setItem("dropify_cart_v1", JSON.stringify(items));
    } catch (e) {}
  }, [items]);

  function add(item) {
    setItems((prev) => [...prev, { ...item, id: Date.now().toString() }]);
  }
  function remove(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }
  function clear() {
    setItems([]);
  }
  function updateQty(id, qty) {
    setItems((prev) => prev.map(i => i.id === id ? { ...i, qty } : i));
  }

  const value = {
    items,
    count: items.length,
    add,
    remove,
    clear,
    updateQty
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}