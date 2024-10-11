import React from 'react';
import { Typography, Card, CardContent, Divider, Box } from '@mui/material';

const StockDetailCard = ({ stock }) => {
  if (!stock) {
    return <div>No stock data available.</div>; // Handle case when no stock data is available
  }

  return (
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Typography variant="h5" component="div">{stock['name']}</Typography>
        <Typography variant="h6" component="div">General Information</Typography>
        <Divider sx={{ margin: '20px 0 20px' }} />
        {[
          ['1y Target Est', stock['1y Target Est']],
          ['52 Week Range', stock['52 Week Range']],
          ['Ask', stock.Ask],
          ['Avg. Volume', stock['Average Volume']],
          ['Beta (5Y Monthly)', stock['Beta (5Y Monthly)']],
          ['Bid', stock.Bid],
          ['Day\'s Range', stock["Day's Range"]],
          ['EPS (TTM)', stock['EPS (TTM)']],
          ['Earnings Date', stock['Earnings Date']],
          ['Ex-Dividend Date', stock['Ex-Dividend Date']],
          ['Forward Dividend & Yield', stock['Forward Dividend & Yield']],
          ['Market Cap (intraday)', stock['Market Cap (intraday)']],
          ['Open', stock.Open],
          ['PE Ratio (TTM)', stock['PE Ratio (TTM)']],
          ['Previous Close', stock['Previous Close']],
          ['Volume', stock.Volume]
        ].map(([label, value], index) => (
          <Box key={index} display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body1">{label}:</Typography>
            <Typography variant="body1" sx={{ textAlign: 'right', fontWeight: 'bold' }}>{value}</Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default StockDetailCard;
