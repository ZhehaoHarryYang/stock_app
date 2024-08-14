import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Adjust the import path as needed

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    // Optionally render a loading spinner or nothing while authentication status is being determined
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
