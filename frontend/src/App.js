import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import StockListPage from './pages/stockListPage';
import StockDetailPage from './pages/stockDetailPage';
import Header from './components/header';
import HistoricalDataPage from './pages/historicalDataPage';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stocklist" element={<StockListPage />} />
        <Route path="/stocks/:symbol" element={<StockDetailPage />} />
        <Route path="/stocks/:symbol/historical" element={<HistoricalDataPage />} />
      </Routes>
    </Router>
  );
};

export default App;
