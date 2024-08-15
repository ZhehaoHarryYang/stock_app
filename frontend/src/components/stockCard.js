import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, Typography, Divider, IconButton, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { FavoriteContext } from '../context/favoriteStockContext'; // Adjust import path as needed
import { useAuth } from '../context/authContext'; // Adjust import path as needed
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const StockCard = ({ stock }) => {
  const { favoriteStocks, addFavorite, removeFavorite } = useContext(FavoriteContext);
  const { isAuthenticated } = useAuth(); // Assuming AuthContext provides authentication status
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const isFav = favoriteStocks.some(favStock => favStock.symbol === stock.symbol);
    setIsFavorite(isFav);
  }, [favoriteStocks, stock.symbol]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(stock.symbol);
    } else {
      addFavorite(stock.symbol);
    }
  };

  const getChangeColor = (change) => {
    if (!change) return 'inherit'; // Default color if no change
    return change.startsWith('+') ? 'green' : 'red';
  };

  return (
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs={10}>
            <Typography 
              variant="h6" 
              style={{
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block',
              }} 
              component={Link} 
              to={`/stocks/${stock.symbol}`}
            >
              {stock.symbol} ({stock.name})
            </Typography>
          </Grid>
          <Grid item xs={2}>
            {isAuthenticated && (
              <IconButton 
                color={isFavorite ? 'primary' : 'default'} 
                onClick={handleFavoriteClick}
                style={{ width: '100%', height: '100%' }}
              >
                {isFavorite ? <RemoveCircleIcon /> : <AddCircleIcon />}
              </IconButton>
            )}
          </Grid>
        </Grid>
        <Divider sx={{ margin:'10px 0 10px' }}/>
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
