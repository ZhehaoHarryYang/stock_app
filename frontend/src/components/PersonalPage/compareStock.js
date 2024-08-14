import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, FormControl, TextField, Popover, List, ListItem, useTheme, useMediaQuery, Button } from '@mui/material';
import { getStockDetail } from '../../api/stocks'; // Update the import path as needed
import { getStockList, fetchCompareStocks, addCompareStock } from '../../api/userStock';
import StockCompareList from './stockCompareList'; // Update the import path as needed
import { useAuth } from '../../context/authContext'

const StockCompare = () => {
  const { userName } = useAuth(); // Retrieve the logged-in user's information
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [stocksData, setStocksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stockList, setStockList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if on mobile view
    // Effect to fetch the stock list only once when the component mounts
    useEffect(() => {
      const fetchStockList = async () => {
        try {
          const list = await getStockList();
          const uniqueList = Array.from(new Set(list));
          uniqueList.push('-Select-'); // Add empty string option
          const transformedList = uniqueList.sort((a, b) => a.localeCompare(b));
          setStockList(transformedList);
        } catch (error) {
          console.error('Error fetching stock list:', error);
        }
      };
  
      fetchStockList();
    }, []); // Empty dependency array ensures this runs only once
  
    // Effect to fetch selected stocks and their data
    useEffect(() => {
      const fetchSelectedStock = async () => {
        try {
          const selectedList = await fetchCompareStocks(userName);
          setSelectedStocks(selectedList);
        } catch (error) {
          console.error('Error fetching compare stock', error);
        }
      };
  
      fetchSelectedStock();
    }, [userName]); // Fetch selected stocks when `userName` changes
  
    // Effect to fetch stock data when `selectedStocks` changes
    useEffect(() => {
      const fetchStocksData = async () => {
        setLoading(true);
        try {
          const nonEmptyStocks = selectedStocks.filter(symbol => symbol.trim() !== '-Select-');
          const data = await Promise.all(nonEmptyStocks.map(symbol => getStockDetail(symbol)));
          const stocks = data.map(stockData => stockData.stock);
          setStocksData(stocks);
        } catch (error) {
          console.error('Error fetching stock data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      if (selectedStocks.length > 0) {
        fetchStocksData();
      }
    }, [selectedStocks]); // Fetch stock data when `selectedStocks` changes

  const handleStockChange = (index) => (event) => {
    const newStocks = [...selectedStocks];
    newStocks[index] = event.target.innerText;
    setSelectedStocks(newStocks);
    setAnchorEl(null); // Close the dropdown when an option is selected
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCompareClick = async () => {
    try{
      await addCompareStock(userName, selectedStocks);
      alert(`Successfully add the compare stock list.`); 
    } catch (error) {
      console.error(`Failed to save compare`, error);
      }
    };

  const open = Boolean(anchorEl);
  const id = open ? `simple-popover-${selectedIndex}` : undefined;

  const filteredStockList = stockList.filter(stock =>
    stock.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <Typography>Loading...</Typography>; // Or a Loading component
  }

  return (
    <Container sx={{ marginTop: isMobile ? 24: 12 }} maxWidth="xl">
      <Button onClick={handleCompareClick}>
        Save the Compare List
      </Button>
      <Typography variant="h4" gutterBottom sx={{ marginLeft: isMobile ? 12: 24 }}>
        Compare {selectedStocks.filter(symbol => symbol.trim() !== '-Select-').join(', ')}
      </Typography>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={2}>
            <Typography variant="h5" gutterBottom>
              
            </Typography>
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={2}>
            {[0, 1, 2, 3].map(index => (
              <Grid item xs={12} lg={3} key={index}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    fullWidth
                    variant="outlined"
                    onClick={(event) => handleClick(event, index)}
                    value={selectedStocks[index]}
                    readOnly
                  />
                  <Popover
                    id={id}
                    open={open && selectedIndex === index}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <div style={{ padding: 16 }}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ marginBottom: 16 }}
                      />
                      <List>
                        {filteredStockList.map(stock => (
                          <ListItem key={stock} onClick={handleStockChange(index)}>
                            {stock}
                          </ListItem>
                        ))}
                      </List>
                    </div>
                  </Popover>
                </FormControl>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
        <Grid item xs={10}>
            <StockCompareList stocks={stocksData} />
        </Grid>
    </Container>
  );
};

export default StockCompare;
