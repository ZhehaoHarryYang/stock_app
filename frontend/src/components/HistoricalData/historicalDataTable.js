import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const HistoricalDataTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Open</TableCell>
            <TableCell>High</TableCell>
            <TableCell>Low</TableCell>
            <TableCell>Close</TableCell>
            <TableCell>Adj Close</TableCell>
            <TableCell>Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.Date}</TableCell>
              <TableCell>{row.Open}</TableCell>
              <TableCell>{row.High}</TableCell>
              <TableCell>{row.Low}</TableCell>
              <TableCell>{row.Close}</TableCell>
              <TableCell>{row.AdjClose}</TableCell>
              <TableCell>{row.Volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoricalDataTable;
