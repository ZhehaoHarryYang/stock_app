import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Stock App
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/stocks">Stock List</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
