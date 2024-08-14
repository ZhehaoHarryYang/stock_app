import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getStocks, searchStocks } from '../../api/stocks';
import StockCard from '../stockCard';
import Pagination from './pagination';
import { Container, Typography, Grid, useMediaQuery, useTheme } from '@mui/material';
import Loading from '../../utils/loading';


const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit] = useState(20);
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page')) || 1;
  const searchQuery = query.get('search') || '';

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true); // Start loading
      try {
        let data;
        if (searchQuery.trim() !== '') {
          data = await searchStocks(searchQuery);
          setStocks(data);
        } else {
          data = await getStocks(page, limit);
          setTotal(data.total);
          setStocks(data.stocks);
        }
      } catch (error) {
        console.error("Error fetching stocks", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchStocks();
  }, [page, limit, searchQuery]);

  const handlePageChange = (newPage) => {
    setLoading(true);
    navigate(`?page=${newPage}`);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: isMobile ? 28 : 14, // More margin on mobile, less on larger screens
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
        overflowX: 'hidden',
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          {stocks.length === 0 ? (
            <Typography variant="h6" color="textSecondary">
              No results found for "{searchQuery}"
            </Typography>
          ) : (
            <>
              <Grid container spacing={3}>
                {stocks.map((stock) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={stock.symbol}>
                    <StockCard stock={stock} />
                  </Grid>
                ))}
              </Grid>
              {!searchQuery && (
                <Pagination page={page} total={total} limit={limit} onPageChange={handlePageChange} />
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default StockList;
