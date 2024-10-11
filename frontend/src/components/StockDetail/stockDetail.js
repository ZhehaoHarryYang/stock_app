import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Grid, Divider, Container, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from './sideBar';
import StockDetailCard from './stockDetailCard';
import DateRangePicker from '../HistoricalData/dateRangePicker';
import { filterDataByRange } from '../../utils/dataByRange';
import { getHistoricalData, getStockDetail, getRecommendStock } from '../../api/stocks';
import HistoricalDataChart from '../HistoricalData/historicalDataChart';
import Loading from '../../utils/loading';
import CompanyOverview from './companyOverview';
import LatestNews from './latestNews';
import PeopleAlsoWatch from './peopleAlsoWatch';

const StockDetail = () => {
  const { symbol } = useParams();
  const [data, setData] = useState([]);
  const [stock, setStock] = useState(null);
  const [recommendStocks, setRecommendStocks] = useState([]);
  const [newes, setNewes] = useState(null);
  const [selectedRange, setSelectedRange] = useState('all');
  const [loading, setLoading] = useState(true);
  const newsRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchStockDetails = async () => {
      setLoading(true);
      try {
        const data = await getStockDetail(symbol);
        setStock(data.stock);
        setNewes(data.news);
      } catch (error) {
        console.error('Error fetching stock details:', error);
      }
    };
    
    const fetchHistoricalData = async () => {
      try {
        const result = await getHistoricalData(symbol);
        const sortedData = result.hist_price.sort((a, b) => new Date(b.Date) - new Date(a.Date));
        setData(sortedData);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    const fetchRecommendStocks = async () => {
      try {
        const data = await getRecommendStock(symbol);
        setRecommendStocks(data);
      } catch (error) {
        console.error('Error fetching stock recommendations:', error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchStockDetails(), fetchHistoricalData(), fetchRecommendStocks()]);
      setLoading(false);
    };

    fetchData();
  }, [symbol]);

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  if (loading) {
    return <Loading />;
  }

  if (!stock) {
    return <div style={{ marginTop:'200px',textAlign: 'center', }}>No stock data available.</div>;
  }

  return (
    <Container
      style={{
        marginLeft: isMobile ? '20px': '250px',
        marginTop: isMobile ? '200px' : '80px',
        padding: '20px',
        width: isMobile ? 'calc(100% - 40px)':'calc(100% - 290px)',
      }}
    >
      {!isMobile && (
        <Sidebar
          symbol={stock.symbol}
          scrollToNews={() => newsRef.current.scrollIntoView({ behavior: 'smooth' })}
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Typography variant="h4" component="div" gutterBottom>
          {stock.name}
        </Typography>
      </div>
      <Divider sx={{ margin: '20px 0 20px', borderBottom: '2px solid black' }} />
      <DateRangePicker selectedRange={selectedRange} onRangeChange={handleRangeChange} />
      <HistoricalDataChart data={filterDataByRange(data, selectedRange)} />
      {isMobile && (
        <Typography
          variant="h6" component={Link} to={`/stocks/${symbol}/historical`} gutterBottom sx={{ textAlign: 'center' }}
        >View Historical Data</Typography>
      )}
      <Grid container spacing={2} marginTop='30px'>
        <Grid item xs={12}>
          <StockDetailCard stock={stock} />
        </Grid>
        <Grid item xs={12}>
          <CompanyOverview stock={stock} />
        </Grid>
      </Grid>
      <Divider sx={{ margin: '40px 0 40px', borderBottom: '2px solid black' }} ref={newsRef} />
      <LatestNews newes={newes} />
      <Divider sx={{ margin: '40px 0 40px', borderBottom: '2px solid black' }} />
      <PeopleAlsoWatch recommendStocks={recommendStocks} />
    </Container>
  );
};

export default StockDetail;
