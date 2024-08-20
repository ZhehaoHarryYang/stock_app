import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getStocks = async (page, limit) => {
  const response = await axios.get(`${BASE_URL}/stocks`, {
    params: { page, limit },
    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true', },
  });
  return response.data;
};

export const getTopGainers = async () => {
  const response = await axios.get(`${BASE_URL}/stocks/top-gainers`, {
    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true', },

  });
  return response.data;
};

export const getTopLosers = async () => {
  const response = await axios.get(`${BASE_URL}/stocks/top-losers`, {
    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true', },

  });
  return response.data;
};

export const getMostActive = async () => {
  const response = await axios.get(`${BASE_URL}/stocks/most-active`, {
    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true', },

  });
  return response.data;
};

export const getTrendingNow = async () => {
  const response = await axios.get(`${BASE_URL}/stocks/trending-now`, {
    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true', },

  });
  return response.data;
};

export const getYearGainers = async () => {
  const response = await axios.get(`${BASE_URL}/stocks/year-gainers`, {
    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true', },

  });
  return response.data;
};

export const getYearLosers = async () => {
  const response = await axios.get(`${BASE_URL}/stocks/year-losers`, {
    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true', },

  });
  return response.data;
};

export const getStockDetail = async (symbol) => {
  const response = await axios.get(`${BASE_URL}/stocks/${symbol}`, { headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true', },
  });
  return response.data;
};

export const getHistoricalData = async (symbol) => {
  const response = await axios.get(`${BASE_URL}/stocks/${symbol}/historical`, { headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true', },
  });
  return response.data;
};

export const searchStocks = async(searchQuery = '') => {
  const response = await axios.get(`${BASE_URL}/stocks/search`, {
    params: { query: searchQuery }, 
    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true', },
  });

  return response.data;
}