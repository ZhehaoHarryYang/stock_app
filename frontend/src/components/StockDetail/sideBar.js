import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = ({ symbol, scrollToNews }) => {
  return (
    <div style={styles.sidebar}>
      <List>
        <ListItem component={Link} to={`/stocks/${symbol}/historical`}>
          <ListItemText primary="View Historical Data" style={{ fontSize: '12px' }} />
        </ListItem>
        <ListItem button onClick={scrollToNews}>
          <ListItemText primary="Latest News" style={{ fontSize: '12px' }} />
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
    top: '60px',
    left: 0,
    height: 'calc(100vh - 60px)',
    overflowY: 'auto',
  },
};

export default Sidebar;
