import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import StockListPage from './pages/stockListPage';
import StockDetailPage from './pages/stockDetailPage';
import Header from './components/header';
import HistoricalDataPage from './pages/historicalDataPage';
import LoginPage from './pages/loginPage'; 
import CreateAccPage from './pages/createAccPage';
import PrivateRoute from './components/privateRoute'; // Adjust the import path as needed
import FavStocksPage from './pages/favStocksPage';
import UserProfilePage from './pages/userProfilePage';
import StockComparePage from './pages/compareStockPage';


const App = () => {

  return (
    <Router basename="/stock_app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stocks" element={<StockListPage />} />
        <Route path="/stocks/:symbol" element={<StockDetailPage />} />
        <Route path="/stocks/:symbol/historical" element={<HistoricalDataPage />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/create-account" element={<CreateAccPage />} /> 
        <Route 
          path="/favorites" 
          element={<PrivateRoute element={<FavStocksPage />} />} 
        />      
        <Route 
          path="/user-account" 
          element={<PrivateRoute element={<UserProfilePage />} />}
        />
        <Route 
          path="/compare" 
          element={<PrivateRoute element={<StockComparePage />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
