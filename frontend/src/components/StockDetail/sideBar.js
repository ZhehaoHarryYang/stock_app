import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = ({ symbol }) => {
  return (
    <div style={styles.sidebar}>
      
      <List>
        <ListItem component={Link} to={`/stocks/${symbol}/historical`}>
          <ListItemText primary="View Historical Data" style={{ fontSize: '12px' }} />
        </ListItem>
      </List>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    padding: '20px',
    position: 'fixed',
    top: '60px', // Adjust according to your header height
    left: 0,
    height: 'calc(100vh - 60px)', // Adjust according to your header height
    overflowY: 'auto',
  },
};

export default Sidebar;
