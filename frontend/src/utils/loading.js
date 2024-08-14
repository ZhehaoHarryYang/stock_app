// src/components/loading.js
import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';

const Loading = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <CircularProgress />
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default Loading;
