import React from 'react';
import { Grid, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import GainerStocks from './gainerStocks';
import LoserStocks from './loserStocks';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 2,
        mt: isMobile ? 24 : 12, // More margin on mobile, less on larger screens
      }}
    >
      <Typography variant="h4" component="div" gutterBottom>
        Stock Movers
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <GainerStocks />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LoserStocks />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
