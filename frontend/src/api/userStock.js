import axios from 'axios';

import { getBaseUrl } from './BaseUrl';

const BASE_URL = await getBaseUrl();

// Fetch favorite stocks
export const fetchFavoriteStocks = async (userName) => {
  try {
    const response = await axios.get(`${BASE_URL}/favorites/${userName}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true',
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch favorite stocks');
  }
};

// Add a favorite stock
export const addFavoriteStock = async (userName, stock) => {
  try {
    await axios.post(`${BASE_URL}/favorites/${userName}`, { stock }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true',
      }
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add favorite stock');
  }
};

// Remove a favorite stock
export const removeFavoriteStock = async (userName, stock) => {
  try {
    await axios.delete(`${BASE_URL}/favorites/${userName}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true',
      },
      data: { stock }
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to remove favorite stock');
  }
};

// Add a favorite stock
export const addCompareStock = async (userName, stock) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/compare/${userName}`,
      { stock },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true',
        },
      }
    );
    // Handle response if needed
    return response.data;
  } catch (error) {
    // Log detailed error for debugging
    console.error('Error adding compare stock:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to add compare stock');
  }
};


// Fetch compare stocks
export const fetchCompareStocks = async (userName) => {
  try {
    const response = await axios.get(`${BASE_URL}/compare/${userName}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true',
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch favorite stocks');
  }
};


export const getStockList = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${BASE_URL}/stockList`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true',
        
      },
    });
    return response.data.stocks;
  } catch (error) {
    console.error('Error fetching stock list:', error);
    throw error;
  }
};