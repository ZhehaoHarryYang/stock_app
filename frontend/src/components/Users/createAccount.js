import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { createAccount } from '../../api/users';

const CreateAccount = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    // Example password requirements
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) return 'Password must be at least 8 characters long';
    if (!hasNumber.test(password)) return 'Password must contain at least one number';
    if (!hasSpecialChar.test(password)) return 'Password must contain at least one special character';
    return '';
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();

    const passwordError = validatePassword(password);
    if (passwordError) {
      setPasswordError(passwordError);
      return;
    }
    
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    console.log('Creating account with', userName, email);

    try {
      const data = await createAccount(userName, email, password);
      console.log('Account created successfully:', data);
      // Handle successful account creation
      navigate('/login');
    } catch (error) {
      console.error('Error creating account:', error.message);
      alert(`Error creating account: ${error.message}`);
    }
  };

  return (
    <Container style={{ marginTop: '120px', maxWidth: '400px' }}>
      <form onSubmit={handleCreateAccount}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              sx={{ 
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
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ 
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
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(validatePassword(e.target.value)); // Validate password on change
              }}
              required
              error={!!passwordError}
              helperText={passwordError}
              sx={{ 
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
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError(e.target.value !== password ? 'Passwords do not match' : '');
              }}
              required
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
              sx={{ 
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
                fontSize: '0.75rem', // Smaller font size
                padding: '6px 12px', // Smaller padding
                minWidth: '150px', // Set a minimum width for the button
                height: '40px', // Set a fixed height
                borderRadius: '4px', 
                textTransform: 'none' // Prevent uppercase text
              }}
            >
              Create Account
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
        <Typography variant="body2">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default CreateAccount;
