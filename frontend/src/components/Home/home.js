import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Tabs, Tab, useMediaQuery, useTheme, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Home = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const tabRoutes = useMemo(() => [
    '/most-active',
    '/trending-now',
    '/top-gainers',
    '/top-losers',
    '/52-week-gainers',
    '/52-week-losers'
  ], []);

  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const currentTab = tabRoutes.indexOf(location.pathname);
    setSelectedTab(currentTab !== -1 ? currentTab : 0);
  }, [location.pathname, tabRoutes]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    navigate(tabRoutes[newValue]);
  };

  return (
    <Container sx={{ flexGrow: 1, padding: 2, mt: isMobile ? 24 : 12, maxWidth: 'xl' }}>
      <Typography variant="h4" component="div" gutterBottom>
        Stock Movers
      </Typography>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        <Tab label="Most Active" />
        <Tab label="Trending Now" />
        <Tab label="Top Gainers" />
        <Tab label="Top Losers" />
        <Tab label="52 Week Gainers" />
        <Tab label="52 Week Losers" />
      </Tabs>
      <Box>
        {children}
      </Box>
    </Container>
  );
};

export default Home;
