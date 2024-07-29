import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Grid, Card, CardContent, Divider } from '@mui/material';
import Sidebar from './sideBar'; // Updated import path to match convention
import { filterDataByRange } from '../../utils/dataByRange'; // Updated import path
import DateRangePicker from '../HistoricalData/dateRangePicker'; // Updated import path
import { getHistoricalData } from '../../api/stocks';
import HistoricalDataChart from '../HistoricalData/historicalDataChart'; // Updated import path

const StockDetail = ({ stock }) => {
  const { symbol } = useParams();
  const [data, setData] = useState([]);
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
    <div style={{ display: 'flex' }}>
      <Sidebar symbol={stock.symbol} />
      <div style={{ marginLeft: '240px', marginTop: '64px', padding: '20px', width: 'calc(100% - 240px)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <DateRangePicker selectedRange={selectedRange} onRangeChange={handleRangeChange} />
        </div>
        <HistoricalDataChart data={filteredData} />
        <Typography variant="h4" component="div" gutterBottom>
          {stock.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">Stock Information</Typography>
                <Divider />
                <Typography variant="body1" color="text.secondary">1y Target Est: {stock['1y Target Est']}</Typography>
                <Typography variant="body1" color="text.secondary">52 Week Range: {stock['52 Week Range']}</Typography>
                <Typography variant="body1" color="text.secondary">Ask: {stock.Ask}</Typography>
                <Typography variant="body1" color="text.secondary">Avg. Volume: {stock['Avg. Volume']}</Typography>
                <Typography variant="body1" color="text.secondary">Beta (5Y Monthly): {stock['Beta (5Y Monthly)']}</Typography>
                <Typography variant="body1" color="text.secondary">Bid: {stock.Bid}</Typography>
                <Typography variant="body1" color="text.secondary">Day's Range: {stock["Day's Range"]}</Typography>
                <Typography variant="body1" color="text.secondary">EPS (TTM): {stock['EPS (TTM)']}</Typography>
                <Typography variant="body1" color="text.secondary">Earnings Date: {stock['Earnings Date']}</Typography>
                <Typography variant="body1" color="text.secondary">Ex-Dividend Date: {stock['Ex-Dividend Date']}</Typography>
                <Typography variant="body1" color="text.secondary">Forward Dividend & Yield: {stock['Forward Dividend & Yield']}</Typography>
                <Typography variant="body1" color="text.secondary">Market Cap (intraday): {stock['Market Cap (intraday)']}</Typography>
                <Typography variant="body1" color="text.secondary">Open: {stock.Open}</Typography>
                <Typography variant="body1" color="text.secondary">PE Ratio (TTM): {stock['PE Ratio (TTM)']}</Typography>
                <Typography variant="body1" color="text.secondary">Previous Close: {stock['Previous Close']}</Typography>
                <Typography variant="body1" color="text.secondary">Volume: {stock.Volume}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">Company Overview</Typography>
                <Divider />
                <Typography variant="body2" color="text.secondary">{stock.Overview}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Typography variant="h6" component="div" gutterBottom style={{ marginTop: '20px' }}>
          Latest News
        </Typography>
        <Grid container spacing={2}>
          {stock.newsList.map((news, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1, marginRight: '10px' }}>
                    <Typography variant="body2" color="text.secondary">{news.source}</Typography>
                    <Typography variant="body1" component="div">
                      <a href={news.link} target="_blank" rel="noopener noreferrer">{news.title}</a>
                    </Typography>
                  </div>
                  {news.image && (
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      style={{ width: '100px', height: 'auto' }} 
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default StockDetail;
