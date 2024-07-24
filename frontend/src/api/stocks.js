import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000/api';

export const getStocks = async (page, limit) => {
  const response = await axios.get(`${BASE_URL}/stocks`, {
    params: { page, limit }
  });
  return response.data;
};

export const getTopGainers = async () => {
  const response = await axios.get(`${BASE_URL}/stocks/top-gainers`);
  return response.data;
};

export const getTopLosers = async () => {
  const response = await axios.get(`${BASE_URL}/stocks/top-losers`);
  return response.data;
};

export const getStockDetail = async (symbol) => {
  const response = await axios.get(`${BASE_URL}/stocks/${symbol}`);
  return response.data;
};

export const getHistoricalData = async (symbol) => {
  const response = await axios.get(`${BASE_URL}/stocks/${symbol}/historical`);
  return response.data;
};