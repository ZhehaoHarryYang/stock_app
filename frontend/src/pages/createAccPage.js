// src/pages/create acc Page.js
import React from 'react';
import CreateAccount from '../components/Users/createAccount'; // Ensure correct path for import
import { Container } from '@mui/material';

const CreateAccPage = () => {
  return (
    <Container style={{ marginTop: '200px' }}> {/* Adjust margin-top if needed */}
      <CreateAccount /> {/* Embed User component here */}
    </Container>
  );
};

export default CreateAccPage;
