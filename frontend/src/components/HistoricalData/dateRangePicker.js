// src/components/DateRangePicker.js
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DateRangePicker = ({ selectedRange, onRangeChange }) => {
  return (
    <FormControl variant="outlined" style={{ minWidth: 120 }}>
      <InputLabel style={{ fontSize: '0.875rem' }}>Range</InputLabel>
      <Select
        value={selectedRange}
        onChange={onRangeChange}
        label="Range"
        style={{ fontSize: '0.875rem' }}
      >
        <MenuItem value="5d">5 Days</MenuItem>
        <MenuItem value="1m">1 Month</MenuItem>
        <MenuItem value="3m">3 Months</MenuItem>
        <MenuItem value="6m">6 Months</MenuItem>
        <MenuItem value="1y">1 Year</MenuItem>
        <MenuItem value="all">All</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DateRangePicker;
