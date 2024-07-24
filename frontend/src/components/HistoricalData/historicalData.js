import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHistoricalData } from '../../api/stocks';
import { Typography } from '@mui/material';
import HistoricalDataTable from './historicalDataTable';
import LoadMoreButton from './loadMoreButton';

const HistoricalData = () => {
  const { symbol } = useParams();
  const [data, setData] = useState([]);
  const [displayCount, setDisplayCount] = useState(10); // Number of rows to display initially

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const result = await getHistoricalData(symbol);
        const sortedData = result.hist_price.sort((a, b) => new Date(b.Date) - new Date(a.Date));
        setData(sortedData);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchHistoricalData();
  }, [symbol]);

  const loadMore = () => {
    setDisplayCount(displayCount + 10); // Increase the number of rows to display by 10
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Historical Data for {symbol}
      </Typography>
      <HistoricalDataTable data={data.slice(0, displayCount)} />
      <LoadMoreButton onClick={loadMore} isVisible={displayCount < data.length} />
    </div>
  );
};

export default HistoricalData;
