import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStockDetail } from '../api/stocks';
import StockDetail from '../components/StockDetail/stockDetail';

const StockDetailPage = () => {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);

  useEffect(() => {
    const fetchStockDetail = async () => {
      try {
        const data = await getStockDetail(symbol);
        setStock(data);
      } catch (error) {
        console.error("Error fetching stock detail:", error);
      }
    };

    fetchStockDetail();
  }, [symbol]);

  return (
    <div>
      {stock ? (
        <StockDetail stock={stock} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StockDetailPage;
