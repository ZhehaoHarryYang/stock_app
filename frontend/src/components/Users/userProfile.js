import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Divider, useTheme, useMediaQuery } from '@mui/material';
import { useAuth } from '../../context/authContext'; // Assuming you have an auth context
import { fetchUserAccount, updateUserInfo, updatePassword } from '../../api/users'; // Update import path as needed
import Loading from '../../utils/loading';
import DeleteUser from './deleteAccount';

const UserProfile = () => {
  const { userName } = useAuth(); // Retrieve the logged-in user's information
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [editEmailMode, setEditEmailMode] = useState(false);
  const [editPasswordMode, setEditPasswordMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if on mobile view
  useEffect(() => {
    const loadUserAccount = async () => {
      try {
        const userAccount = await fetchUserAccount(userName);
        setEmail(userAccount.user.email);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user account:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    loadUserAccount();
  }, [userName]);

  const handleUpdateEmail = async () => {
    try {
      await updateUserInfo(userName, email);
      setEditEmailMode(false);
      setSuccess('Email updated successfully');
      setError('');
    } catch (error) {
      setError(`Error updating email: ${error.message}`);
      setSuccess('')
    }
  };
  const validatePassword = (password) => {
    // Example password requirements
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      setSuccess('');
      return 'Password must be at least 8 characters long';
    }  
    if (!hasNumber.test(password)){
      setSuccess('');      
      return 'Password must contain at least one number';
    }
    if (!hasSpecialChar.test(password)) {
      setSuccess('');
      return 'Password must contain at least one special character';
    }
    return '';
  };

  const handleUpdatePassword = async () => {
    // Validate new password
    const passwordValidationError = validatePassword(newPassword);
    if (passwordValidationError) {
      setError(passwordValidationError);
      setSuccess('');
      return;
    }
  
    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match');
      setSuccess('');
      return;
    }
  
    try {
      await updatePassword(userName, currentPassword, newPassword);
      setEditPasswordMode(false);
      setSuccess('Password updated successfully');
      setError('');
    } catch (error) {
      setError(`Error updating password: ${error.message}`);
      setSuccess('');
    }
  };
  

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container sx={{ mt: isMobile ? 24:12 }} maxWidth='sm' >
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginBottom:'50px' }}>
          <Typography variant="h4" >
            Hello {userName.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ padding: '10px' }}>Personal Contact </Typography>
          <Divider />
          {editEmailMode ? (
            <>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ padding: '10px'}}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateEmail}
                fullWidth
                sx={{ margin: '10px'}}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setEditEmailMode(false)}
                fullWidth
                sx={{ margin: '10px'}}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body1" sx={{ padding: '10px' }}>Email: {email}</Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setEditEmailMode(true)}
                fullWidth
                sx={{ margin: '10px'}}
              >
                Edit Email
              </Button>
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ padding: '10px' }}>Password: </Typography>
          <Divider />
          <Typography variant="body1" sx={{ padding: '10px' }}>A secure password helps protect your account </Typography>
          {editPasswordMode ? (
            <>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                variant="outlined"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError(validatePassword(e.target.value)); // Validate password on change
                }}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                variant="outlined"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleUpdatePassword}
                fullWidth
                sx={{ mb: 2 }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setEditPasswordMode(false)}
                fullWidth
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setEditPasswordMode(true)}
                fullWidth
                sx={{ margin: '10px' }}
              >
                Edit Password
              </Button>
            </>
          )}
          {error && <Typography color="secondary">**{error}</Typography>}
          {success && <Typography color="secondary">**{success}</Typography>}
        </Grid>
        <DeleteUser />
      </Grid>
    </Container>
  );
};

export default UserProfile;
