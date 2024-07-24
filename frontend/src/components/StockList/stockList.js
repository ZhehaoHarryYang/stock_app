import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getStocks } from '../../api/stocks';
import StockCard from '../stockCard';
import Pagination from './pagination';
import { Container, Typography, Grid } from '@mui/material';

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit] = useState(20);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page')) || 1;

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const data = await getStocks(page, limit);
        setStocks(data.stocks);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching stocks", error);
      }
    };

    fetchStocks();
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    navigate(`?page=${newPage}`);
  };

  return (
    <Container style={{ marginLeft: '64px', marginTop: '64px', padding: '20px', width: 'calc(100% - 240px)' }}>
      <Typography variant="h3">Stock List</Typography>
      <Grid container spacing={3}>
        {stocks.map((stock) => (
          <Grid item xs={12} sm={6} md={3} key={stock.symbol}>
            <StockCard stock={stock} />
          </Grid>
        ))}
      </Grid>
      <Pagination page={page} total={total} limit={limit} onPageChange={handlePageChange} />
    </Container>
  );
};

export default StockList;
