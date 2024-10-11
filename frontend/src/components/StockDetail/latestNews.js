import React from 'react';
import { Typography, Grid, Card, CardContent } from '@mui/material';

const LatestNews = ({ newes }) => {
  return (
    <>
      <Typography variant="h5" component="div" sx={{ marginBottom: '10px' }}>
        Latest News
      </Typography>
      {newes.newsList && (
        <Grid container spacing={2}>
          {newes.newsList.map((news, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="body2" color="text.secondary">{news.source}</Typography>
                  <Typography variant="body1" component="div">
                    <a href={news.link} target="_blank" rel="noopener noreferrer">{news.title}</a>
                  </Typography>
                  {news.image && (
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      style={{ width: '100%', height: 'auto', marginTop: '10px' }} 
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default LatestNews;
