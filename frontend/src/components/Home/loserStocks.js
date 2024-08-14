import React, { useEffect, useState } from 'react';
import { getTopLosers } from '../../api/stocks';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Loading from '../../utils/loading'; // Import the Loading component

const LoserStocks = () => {
  const [losers, setLosers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchLosers = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const data = await getTopLosers();
        setLosers(data);
      } catch (err) {
        console.error('Error fetching top losers:', err);
      } finally {
        setLoading(false); // Ensure loading is set to false after fetching
      }
    };

    fetchLosers();
  }, []);

  // Handle loading and error states in the component render
  if (loading) {
    return <Loading />; // Show loading component while loading
  }

  return (
    <div>
      <Typography variant="h6" component="div" gutterBottom>
        Top Losers
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {losers.map(stock => (
              <TableRow key={stock.symbol}>
                <TableCell>
                  <Link to={`/stocks/${stock.symbol}`}>
                    {stock.symbol}
                  </Link>
                </TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.price}</TableCell>
                <TableCell style={{ color: 'red' }}>{stock.change}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LoserStocks;
