import React from 'react';
import { getYearLosers } from '../../api/stocks'; // Define this function in your API file
import StockTable from './stockTable';

const YearLosers = () => {
  const columns = {
    title: '52 Week Losers',
    headers: ['Symbol', 'Name', 'Price', 'Change', 'Change %', 'Volume', 'Avg Vol (3M)', 'Market Cap', 'P/E Ratio (TTM)', '52 Wk Change %'],
    fields: ['symbol', 'name', 'price', 'change', 'changePer', 'volume', 'avgVol', 'marketCap', 'PER', 'YearChangePer']
  };

  const getChangeColor = (change) => {
    if (!change) return 'inherit';
    return change.startsWith('-') ? 'red' : 'green';
  };

  return <StockTable fetchStocks={getYearLosers} columns={columns} getChangeColor={getChangeColor} />;
};

export default YearLosers;
