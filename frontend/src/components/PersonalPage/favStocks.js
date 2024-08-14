import React, { useState, useContext, useEffect } from 'react';
import { Container, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';
import StockCard from '../stockCard';
import { FavoriteContext } from '../../context/favoriteStockContext'; // Adjust the import path as needed
import { useAuth } from '../../context/authContext';
import Loading from '../../utils/loading';

const FavStocks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { userName } = useAuth(); // Retrieve the logged-in user's information
  const { favoriteStocks } = useContext(FavoriteContext); // Access favorite stocks from context
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if on mobile view
  
  // We rely on the context for updating favorite stocks, so no need to fetch again here.
  // Set loading to false as soon as we have favoriteStocks
  useEffect(() => {
    if (favoriteStocks.length) {
      setIsLoading(false);
    }
  }, [favoriteStocks]);

  if (isLoading) {
    return <Loading />; // Show loading spinner
  }
  
  return (
    <Container sx={{ marginTop: isMobile ? 24 : 12 }}>
      <Typography variant="h4" gutterBottom>
        {userName.toUpperCase()}'s Saved Stocks
      </Typography>
      <Grid container spacing={3}>
        {favoriteStocks.map((stock) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={stock.symbol}>
            <StockCard stock={stock} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FavStocks;
