import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Grid, Card, CardContent, Divider, Button } from '@mui/material';
import Sidebar from './sideBar';
import StockDetailCard from './stockDetailCard';
import { filterDataByRange } from '../../utils/dataByRange';
import DateRangePicker from '../HistoricalData/dateRangePicker';
import { getHistoricalData, getStockDetail } from '../../api/stocks';
import HistoricalDataChart from '../HistoricalData/historicalDataChart';
import Loading from '../../utils/loading';

const StockDetail = () => {
  const { symbol } = useParams();
  const [data, setData] = useState([]);
  const [stock, setStock] = useState(null);
  const [newes, setNewes] = useState(null);
  const [selectedRange, setSelectedRange] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const newsRef = useRef(null); // Create a ref for the news section

  useEffect(() => {
    const fetchStockDetails = async () => {
      setLoading(true);
      try {
        const data = await getStockDetail(symbol);
        setStock(data.stock);
        setNewes(data.news);
      } catch (error) {
        console.error('Error fetching stock details:', error);
      }
    };

    const fetchHistoricalData = async () => {
      try {
        const result = await getHistoricalData(symbol);
        const sortedData = result.hist_price.sort((a, b) => new Date(b.Date) - new Date(a.Date));
        setData(sortedData);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchStockDetails(), fetchHistoricalData()]);
      setLoading(false);
    };

    fetchData();
  }, [symbol]);

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  const handleToggleOverview = () => {
      setIsOverviewExpanded(!isOverviewExpanded);
    };
  
  // Truncate function
  const truncateText = (text) => {
    const maxLength = 100; // Set maximum length for truncated text
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const filteredData = filterDataByRange(data, selectedRange);

  if (loading) {
    return <Loading />;
  }

  if (!stock) {
    return <div>No stock data available.</div>;
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar symbol={stock.symbol} scrollToNews={() => newsRef.current.scrollIntoView({ behavior: 'smooth' })} />
      <div style={{ marginLeft: '250px', marginTop: '64px', padding: '20px', width: 'calc(100% - 250px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Typography variant="h4" component="div" gutterBottom>
            {stock.name}
          </Typography>
        </div>
        <Divider sx={{ margin: '20px 0 20px', borderBottom: '2px solid black'}}/>
        <DateRangePicker selectedRange={selectedRange} onRangeChange={handleRangeChange} />
        <HistoricalDataChart data={filteredData} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StockDetailCard stock={stock} />
          </Grid>
          <Grid item xs={12}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h5" component="div">Company Overview</Typography>
                <Divider sx={{ margin: '20px 0 20px' }} />
                <Typography variant="body2" color="text.secondary">
                  {isOverviewExpanded ? stock.Overview : truncateText(stock.Overview)}
                </Typography>
                <Button onClick={handleToggleOverview} sx={{ mt: 1 }}>
                  {isOverviewExpanded ? 'Read Less' : 'Read More'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Divider sx={{ margin: '40px 0 40px', borderBottom: '2px solid black'}}  ref={newsRef}/>
        <Typography variant="h4" component="div" gutterBottom style={{ marginTop: '40px' }}>
          Latest News
        </Typography>
        {newes.newsList && (
          <Grid container spacing={2}>
            {newes.newsList.map((news, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2" color="text.secondary">{news.source}</Typography>
                    <Typography variant="body1" component="div">
                      <a href={news.link} target="_blank" rel="noopener noreferrer">{news.title}</a>
                    </Typography>
                    {news.image && (
                      <img 
                        src={news.image} 
                        alt={news.title} 
                        style={{ width: '100%', height: 'auto', marginTop: '10px' }} 
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default StockDetail;
