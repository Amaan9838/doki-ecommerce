'use client';

import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const WishlistContext = createContext();

// Create the provider component
export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist items from localStorage on initial render
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlistItems');
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  // Save wishlist items to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      if (!prevItems.find((item) => item.id === product.id)) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
