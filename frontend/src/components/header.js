import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Divider, Box, useMediaQuery, useTheme, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Search from './search';
import { useAuth } from '../context/authContext';

const Header = () => {
  const { isAuthenticated, userName, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  // State for controlling the dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      setAnchorEl(null); // Hide menu if authenticated
    }
  }, [isAuthenticated]);
  // Opens the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Closes the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handles user logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Render authentication buttons and dropdown
  const renderAuthButtons = () => (
    isAuthenticated ? (
      <>
        <Button
          color="primary"
          onClick={handleClick}
        >
          {userName}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            component={Link}
            to="/user-account"
            onClick={handleClose}
          >
            Profile
          </MenuItem>
          <MenuItem
            component={Link}
            to="/favorites"
            onClick={handleClose}
          >
            Favorite Stocks
          </MenuItem>
          <MenuItem
            component={Link}
            to="/compare"
            onClick={handleClose}
          >
            Compare Stocks
          </MenuItem>
          <MenuItem onClick={handleLogout}>Log Out</MenuItem>
        </Menu>
      </>
    ) : (
      <Button color="primary" component={Link} to="/login">Log In Your Account</Button>
    )
  );

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#F2D2BD', marginBottom: isMobile ? '200px' : '200px' }}>
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          padding: '0 16px',
          
        }}
      >
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'black',
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            textAlign: isMobile ? 'center' : 'left'
          }}
        >
          Stock App
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: isMobile ? 'center' : 'flex-end',
            width: '90%',
          }}
        >
          <Search sx={{ mb: isMobile ? 2 : 0, width: isMobile ? '100%' : 'auto' }} />
          {!isMobile && (
            <>
              <Box sx={{ mx: 2 }}>
                <Divider orientation="vertical" flexItem sx={{ height: 40, borderColor: 'gray' }} />
              </Box>
              <Button color="primary" component={Link} to="/stocks">Stock List</Button>
              <Box sx={{ mx: 2 }}>
                <Divider orientation="vertical" flexItem sx={{ height: 40, borderColor: 'gray' }} />
              </Box>
              {renderAuthButtons()}
            </>
          )}
          {isMobile && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button component={Link} to="/stocks" sx={{ mb: 1, color: "primary" }}>Stock List</Button>
              {renderAuthButtons()}
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
