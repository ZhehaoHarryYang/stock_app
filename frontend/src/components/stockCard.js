import React from 'react';
import { Card, CardContent, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const StockCard = ({ stock }) => {
  const getChangeColor = (change) => {
    if (!change) return 'inherit'; // Default color if no change
    return change.startsWith('+') ? 'green' : 'red';
  };
  return (
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          <Link to={`/stocks/${stock.symbol}`}>
            {stock.name} ({stock.symbol})
          </Link>
        </Typography>
        <Divider />
        <Typography variant="body2">
          Price: ${stock.price} 
        </Typography>
        {stock.change && (
          <Typography 
            variant="body2" 
            style={{ color: getChangeColor(stock.perChange) }}
          >
            Price Change: {stock.change} ({stock.perChange})
          </Typography>
        )}
        {stock.volume && (
          <Typography variant="body2" color="text.secondary">
            Volume: {stock.volume}
          </Typography>
        )}
        {stock.averageVolume && (
          <Typography variant="body2" color="text.secondary">
            Average Volume: {stock.averageVolume}
          </Typography>
        )}
        {stock.MarketCap && (
          <Typography variant="body2" color="text.secondary">
            Market Cap: {stock.MarketCap}
          </Typography>
        )}
        {stock.PER && (
          <Typography variant="body2" color="text.secondary">
            P/E Ratio: {stock.PER}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StockCard;
