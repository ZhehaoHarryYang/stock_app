import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/users';
import { useAuth } from '../../context/authContext'; // Import the custom hook

const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  // Effect to handle redirection if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/favorites');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const token = await loginUser(userName, password);
      login(token); // Set token in AuthContext
      navigate('/favorites'); // Redirect to home or protected page
    } catch (error) {
      alert(`Error login account: ${error.message}`);
    }
  };

  return (
    <Container style={{ marginTop: '120px', maxWidth: '400px' }}>
      <form onSubmit={handleLogin}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              sx={{ 
                width: '100%', 
                marginBottom: 2,
                '& .MuiInputBase-input': {
                  fontSize: '0.875rem',
                  padding: '8px 12px'
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px'
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ 
                width: '100%', 
                marginBottom: 2,
                '& .MuiInputBase-input': {
                  fontSize: '0.875rem',
                  padding: '8px 12px'
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px'
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
              sx={{
                fontSize: '0.875rem', // Smaller font size
                padding: '6px 12px', // Smaller padding
                height: '40px', // Set a fixed height
                borderRadius: '4px', 
              }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
        <Typography variant="body2">
          Don't have an account? <Link to="/create-account">Create one</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
