// src/components/HistoricalData.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHistoricalData } from '../../api/stocks';
import HistoricalDataChart from './historicalDataChart';
import HistoricalDataTable from './historicalDataTable';
import LoadMoreButton from './loadMoreButton';
import DateRangePicker from './dateRangePicker';
import { Typography } from '@mui/material';
import { filterDataByRange } from '../../utils/dataByRange'; // Import the utility function

const HistoricalData = () => {
  const { symbol } = useParams();
  const [data, setData] = useState([]);
  const [displayCount, setDisplayCount] = useState(10); // Number of rows to display initially
  const [selectedRange, setSelectedRange] = useState('all'); // Default to 'all'

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

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  const filteredData = filterDataByRange(data, selectedRange);

  return (
    <div style={{ marginLeft: '64px', marginTop: '64px', padding: '20px', width: 'calc(100% - 240px)' }}>
      <Typography variant="h4" gutterBottom>
        Historical Data for {symbol}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <DateRangePicker selectedRange={selectedRange} onRangeChange={handleRangeChange} />
      </div>
      <HistoricalDataChart data={filteredData} />
      <HistoricalDataTable data={data.slice(0, displayCount)} />
      <LoadMoreButton onClick={() => setDisplayCount(displayCount + 10)} isVisible={displayCount < data.length} />
    </div>
  );
};

export default HistoricalData;
