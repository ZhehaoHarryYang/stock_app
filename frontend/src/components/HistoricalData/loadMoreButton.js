import React from 'react';
import { Button } from '@mui/material';

const LoadMoreButton = ({ onClick, isVisible }) => {
  return (
    isVisible && (
      <Button variant="contained" color="primary" onClick={onClick} style={{ marginTop: '20px' }}>
        Load More
      </Button>
    )
  );
};

export default LoadMoreButton;
