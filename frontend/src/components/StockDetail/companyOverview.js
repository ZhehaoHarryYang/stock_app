import React, { useState } from 'react';
import { Typography, Grid, Card, CardContent, Divider, Collapse, Button, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const CompanyOverview = ({ stock }) => {
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateText = (text) => {
    const maxLength = 500;
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleToggleOverview = () => {
    setIsOverviewExpanded(!isOverviewExpanded);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card style={{ height: '100%' }}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleToggleExpand}>
          <IconButton>{isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
          <Typography variant="h5" component="div">
            Company Overview
          </Typography>
        </div>
        <Collapse in={isExpanded}>
          <Divider sx={{ margin: '20px 0' }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="body2" color="text.secondary">
                {isOverviewExpanded ? stock.Overview : truncateText(stock.Overview)}
              </Typography>
              <Button onClick={handleToggleOverview} sx={{ mt: 1 }}>
                {isOverviewExpanded ? 'Read Less' : 'Read More'}
              </Button>
              {stock.Website && (
                <Typography variant="body2" color="black" fontWeight="bold">
                  <a href={stock.Website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {stock.Website}
                  </a>
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  {stock['Fiscal Year Ends'] && (
                    <Typography variant="body2" color="black" fontWeight="bold" sx={{ margin: '10px 0' }}>
                      {stock['Fiscal Year Ends']}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary" sx={{ margin: '10px 0' }}>
                    Fiscal Year Ends
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  {stock['Full Time Employees'] && (
                    <Typography variant="body2" color="black" fontWeight="bold" sx={{ margin: '10px 0' }}>
                      {stock['Full Time Employees']}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary" sx={{ margin: '10px 0' }}>
                    Full Time Employees
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  {stock.Industry && (
                    <Typography variant="body2" color="black" fontWeight="bold" sx={{ margin: '10px 0' }}>
                      {stock.Industry}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary" sx={{ margin: '10px 0' }}>
                    Industry
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  {stock.Sector && (
                    <Typography variant="body2" color="black" fontWeight="bold" sx={{ margin: '10px 0' }}>
                      {stock.Sector}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary" sx={{ margin: '10px 0' }}>
                    Sector
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default CompanyOverview;
