import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("toytopia-cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("toytopia-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (toy) => {
    const exists = cart.find((item) => item.toyId === toy.toyId);
    if (exists) {
      toast.error("This toy is already in your cart!");
      return;
    }
    const newCart = [...cart, toy];
    setCart(newCart);
    toast.success(`${toy.toyName} added to cart!`);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.toyId !== id);
    setCart(updatedCart);
    toast.success("Item removed from cart");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
