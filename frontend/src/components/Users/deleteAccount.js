import React, { useState } from 'react';
import { Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress, Divider } from '@mui/material';
import { deleteUser } from '../../api/users'; // Update the import path as needed
import { useAuth } from '../../context/authContext';

const DeleteUser = () => {
  const { userName, logout } = useAuth(); // Retrieve logged-in user's information
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteUser(userName, password);
      setSuccess('User deleted successfully');
      logout();
    
    } catch (error) {
      setError('Error deleting user: ' + error.message);
    }
    setIsLoading(false);
  };
  
  return (
    <Container sx={{ marginTop: '50px'}}>
      <Typography variant='h5' sx={{ padding: '10px'}}>
        Delete Account
      </Typography>
      <Divider />
      <Typography sx={{ padding: '10px'}}>
        Once you delete your account, there is no going back. Please be certain.
      </Typography>
      <Button variant="contained" color="secondary" sx={{ margin: '10px'}} onClick={handleClickOpen}>
        Delete Account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete your account? This action cannot be undone.
          </Typography>
          <TextField
            fullWidth
            label="Enter your password to confirm"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginTop: 2 }}
          />
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          {success && <Typography color="success" sx={{ mt: 2 }}>{success}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DeleteUser;
