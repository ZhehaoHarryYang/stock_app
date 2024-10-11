import React, { useRef } from 'react';
import { Typography, Card, CardContent, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PeopleAlsoWatch = ({ recommendStocks }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h5" component="div" gutterBottom style={{ marginRight: 'auto' }}>
          People Also Watch
        </Typography>
        <IconButton onClick={scrollLeft}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton onClick={scrollRight}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
      {recommendStocks && recommendStocks.length > 0 && (
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            paddingBottom: '20px',
          }}
        >
          {recommendStocks.map((stock, index) => (
            <Card key={index} style={{ minWidth: '300px', margin: '0 10px' }}>
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  component={Link}
                  to={`/stocks/${stock.symbol}`}
                  style={{ textDecoration: 'none' }}
                >
                  {stock.symbol}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stock.name}
                </Typography>
                <Typography variant="body1" color="black">
                  Price: ${stock.price}
                </Typography>
                <Typography
                  variant="body2"
                  color={stock.perChange >= 0 ? 'green' : 'red'}
                  fontWeight="bold"
                >
                  {stock.perChange >= 0 ? `+${stock.perChange}%` : `${stock.perChange}%`}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default PeopleAlsoWatch;
