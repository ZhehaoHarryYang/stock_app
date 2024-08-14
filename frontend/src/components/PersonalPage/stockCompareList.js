import React from 'react';
import { Box, Typography, Grid, Divider,useMediaQuery, useTheme } from '@mui/material';

const StockCompareList = ({ stocks }) => {
  // Define labels to exclude
  const excludedLabels = ['Overview', '_id', 'name', 'symbol'];
  const allKeys = Object.keys(stocks[0] || {}).filter(key => !excludedLabels.includes(key));

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg')); // Check if on mobile view


  return (
    <Grid container spacing={2}>
       {!isMobile && (
        <Grid item xs={0} lg={2}>
          {allKeys.map((key) => (
            <React.Fragment key={key}>
              <Typography variant="body2" sx={{ textAlign: 'left', mb: 1, whiteSpace: 'nowrap' }}>
                {key}
              </Typography>
              <Divider sx={{ borderStyle: 'dashed' }} />
            </React.Fragment>
          ))}
        </Grid>
      )}
        <Grid item xs={12} lg={10}>
            <Grid container spacing={2}>
                {stocks.map((stock, stockIndex) => (
                    <Grid item xs={12} lg={3} key={stock.symbol}>
                    {Object.keys(stock)
                        .filter(key => !excludedLabels.includes(key)) // Exclude unwanted labels
                        .map((key) => (
                        <React.Fragment key={`${stock.symbol}-${key}`}>
                            <Box sx={{ mb: 1 }}>
                                <Typography variant="body2" sx={{ flex: 1, textAlign: 'left', whiteSpace: 'nowrap' }}>
                                    {isMobile ? key || 'N/A' : ''}
                                </Typography>
                                <Typography variant="body2" sx={{ flex: 1, textAlign: 'center', whiteSpace: 'nowrap' }}>
                                    {stockIndex === 0 ? stock[key] : stock[key] || 'N/A'}
                                </Typography>
                            </Box>
                            <Divider sx={{ borderStyle: 'dashed' }} />
                        </React.Fragment>
                        ))}
                        {isMobile && (<Divider
                            sx={{
                            borderColor: 'blue',
                            borderWidth: 3,
                            borderStyle: 'solid',
                            }}
                        />)}
                    </Grid>
                ))}
            </Grid>
        </Grid>
        
    </Grid>
  );
};

export default StockCompareList;
