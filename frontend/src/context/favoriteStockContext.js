import React, { createContext, useState, useEffect } from 'react';
import { fetchFavoriteStocks, addFavoriteStock, removeFavoriteStock } from '../api/userStock';
import { useAuth } from './authContext';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favoriteStocks, setFavoriteStocks] = useState([]);
  const { userName } = useAuth(); // Retrieve the logged-in user's information

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await fetchFavoriteStocks(userName);
        setFavoriteStocks(favorites);
      } catch (error) {
        console.error('Failed to fetch favorite stocks:', error);
      }
    };

    loadFavorites();
  }, [userName]);

  const loadFavorites = async () => {
    try {
      const favorites = await fetchFavoriteStocks(userName);
      setFavoriteStocks(favorites);
    } catch (error) {
      console.error('Failed to fetch favorite stocks:', error);
    }
  };

  const addFavorite = async (symbol) => {
    try {
      await addFavoriteStock(userName, symbol);
      loadFavorites(); // Re-fetch the list after adding a stock
    } catch (error) {
      console.error('Failed to add favorite stock:', error);
    }
  };

  const removeFavorite = async (symbol) => {
    try {
      await removeFavoriteStock(userName, symbol);
      loadFavorites(); // Re-fetch the list after removing a stock
    } catch (error) {
      console.error('Failed to remove favorite stock:', error);
    }
  };

  return (
    <FavoriteContext.Provider value={{ favoriteStocks, addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
