// src/components/HistoricalData.js
import React, { useEffect, useState,  } from 'react';
import { useParams } from 'react-router-dom';
import { getHistoricalData } from '../../api/stocks';
import HistoricalDataChart from './historicalDataChart';
import HistoricalDataTable from './historicalDataTable';
import LoadMoreButton from './loadMoreButton';
import DateRangePicker from './dateRangePicker';
import { Typography, useTheme, useMediaQuery, Container  } from '@mui/material';
import { filterDataByRange } from '../../utils/dataByRange'; // Import the utility function
import Loading from '../../utils/loading'; // Import the Loading component


const HistoricalData = () => {
  const { symbol } = useParams();
  const [data, setData] = useState([]);
  const [displayCount, setDisplayCount] = useState(10); // Number of rows to display initially
  const [selectedRange, setSelectedRange] = useState('all'); // Default to 'all'
  const [loading, setLoading] = useState(true); // Add loading state
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const result = await getHistoricalData(symbol);
        const sortedData = result.hist_price.sort((a, b) => new Date(b.Date) - new Date(a.Date));
        setData(sortedData);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchHistoricalData();
  }, [symbol]);

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  const filteredData = filterDataByRange(data, selectedRange);
  
  if (loading) {
    return <Loading />; // Show loading component while loading
  }
  return (
    <Container style={{ 
      marginLeft: isMobile? '20px' : '64px', 
      marginTop: isMobile? '180px' : '80px', 
      padding: '20px', 
      width: isMobile? 'calc(100% - 40px)' : 'calc(100% - 100px)' 
      }}>
      <Typography variant="h4" gutterBottom>
        Historical Data for {symbol}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <DateRangePicker selectedRange={selectedRange} onRangeChange={handleRangeChange} />
      </div>
      <HistoricalDataChart data={filteredData} />
      <HistoricalDataTable data={data.slice(0, displayCount)} />
      <LoadMoreButton onClick={() => setDisplayCount(displayCount + 10)} isVisible={displayCount < data.length} />
    </Container>
  );
};

export default HistoricalData;
