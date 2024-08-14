// src/components/Search.js
import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/stocks?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        variant="outlined"
        size="small"
        label="Search for your stock"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          marginRight: '8px',
          backgroundColor: '#ffffff', // White background
          borderRadius: '4px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
          transition: 'border-color 0.3s, box-shadow 0.3s',
          width: '300px' // Adjust width as needed
        }}
      />
      <IconButton type="submit" color="primary">
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default Search;
