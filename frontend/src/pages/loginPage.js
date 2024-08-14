// src/pages/UserPage.js
import React from 'react';
import Login from '../components/Users/login'; // Ensure correct path for import
import { Container } from '@mui/material';

const LoginPage = () => {
  return (
    <Container style={{ marginTop: '200px' }}> {/* Adjust margin-top if needed */}
      <Login /> {/* Embed User component here */}
    </Container>
  );
};

export default LoginPage;
