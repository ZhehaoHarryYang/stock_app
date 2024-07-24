import React, { useEffect, useState } from 'react';
import { getTopLosers } from '../../api/stocks';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const LoserStocks = () => {
  const [losers, setLosers] = useState([]);

  useEffect(() => {
    const fetchLosers = async () => {
      const data = await getTopLosers();
      setLosers(data);
    };

    fetchLosers();
  }, []);

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
