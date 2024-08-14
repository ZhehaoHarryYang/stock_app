import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/authContext';
import { FavoriteProvider } from './context/favoriteStockContext'; // Adjust the import path as needed

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <FavoriteProvider>
      <App />
    </FavoriteProvider>
  </AuthProvider>
);
