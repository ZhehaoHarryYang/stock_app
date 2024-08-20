import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Loading from '../../utils/loading';

const StockTable = ({ fetchStocks, columns, getChangeColor }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchStocks();
        setStocks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchStocks]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Typography variant="h6" component="div" gutterBottom>
        {columns.title}
      </Typography>
      <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.headers.map((header, index) => (
                <TableCell
                  key={index}
                  style={{
                    position: index === 0 ? 'sticky' : 'static',
                    left: index === 0 ? 0 : 'auto',
                    background: index === 0 ? 'linear-gradient(to right, #fff, #f0f0f0)' : 'inherit', // Gradient for first column
                    fontWeight: index === 0 ? 'bold' : 'normal',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map(stock => (
              <TableRow key={stock.symbol}>
                {columns.fields.map((field, index) => (
                  <TableCell
                    key={field}
                    style={{
                      whiteSpace: 'nowrap',
                      position: index === 0 ? 'sticky' : 'inherit',
                      left: index === 0 ? 0 : 'inherit',
                      background: index === 0 ? 'linear-gradient(to right, #fff, #f0f0f0)' : 'inherit',
                      fontWeight: index === 0 ? 'bold' : 'normal',
                      color: ['change', 'changePer', 'YearChangePer'].includes(field) ? getChangeColor(stock[field]) : 'inherit',
                    }}
                  >
                    {field === 'symbol' ? (
                      <Link to={`/stocks/${stock.symbol}`}>{stock.symbol}</Link>
                    ) : (
                      stock[field]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StockTable;
