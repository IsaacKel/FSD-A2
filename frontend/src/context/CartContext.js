import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

// Create CartContext
export const CartContext = createContext();

// CartContext Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      //const userId = user.id; //UPDATE THIS TO FETCH USER ID
      const userId = 1; 
      const cartId = userId
      const response = await axios.get(`http://localhost:4000/api/cart/${cartId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  // Add product to cart
  const addToCart = async (productId, quantity) => {
    try {
      const userId = 1; //UPDATE THIS TO FETCH USER ID
      await axios.post('http://localhost:4000/api/cart/add', { userId, productId, quantity });
      // Refetch the cart after adding the product
      fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Update product quantity in cart
  const updateCartItem = async (cartLineId, quantity) => {
    try {
      await axios.put('http://localhost:4000/api/cart/update', { cartLineId, quantity });
      // Refetch the cart after updating the quantity
      fetchCart();
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  // Increase product quantity in cart
  const increaseQuantity = async (productId) => {
    const cartLine = cart.cartLines.find(line => line.productId === productId);
    if (cartLine) {
      updateCartItem(cartLine.cartLineId, cartLine.quantity + 1);
    } else {
      console.error('Cart line not found');
    }
  }

  // Decrease product quantity in cart 
  const decreaseQuantity = async (productId) => {
    const cartLine = cart.cartLines.find(line => line.productId === productId);
    if (cartLine && cartLine.quantity > 1) {
      updateCartItem(cartLine.cartLineId, cartLine.quantity - 1);
    } else {
      removeFromCart(cartLine.cartLineId);}
  }

  // Remove product from cart
  const removeFromCart = async (cartLineId) => {
    try {
      await axios.delete(`http://localhost:4000/api/cart/remove/${cartLineId}`);
      // Refetch the cart after removing the product
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
