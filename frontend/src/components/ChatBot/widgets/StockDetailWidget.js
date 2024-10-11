import React from 'react';

const StockDetailWidget = ({ payload }) => {
  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h3 style={{ margin: 0 }}>{payload.name}</h3>
      <p><strong>1y Target Est:</strong> {payload['1y Target Est']}</p>
      <p><strong>52 Week Range:</strong> {payload['52 Week Range']}</p>
      <p><strong>Ask:</strong> {payload.Ask}</p>
      <p><strong>Avg. Volume:</strong> {payload['Average Volume']}</p>
      <p><strong>Beta (5Y Monthly):</strong> {payload['Beta (5Y Monthly)']}</p>
      <p><strong>Bid:</strong> {payload.Bid}</p>
      <p><strong>Day's Range:</strong> {payload["Day's Range"]}</p>
      <p><strong>EPS (TTM):</strong> {payload['EPS (TTM)']}</p>
      <p><strong>Earnings Date:</strong> {payload['Earnings Date']}</p>
      <p><strong>Ex-Dividend Date:</strong> {payload['Ex-Dividend Date']}</p>
      <p><strong>Forward Dividend & Yield:</strong> {payload['Forward Dividend & Yield']}</p>
      <p><strong>Market Cap (intraday):</strong> {payload['Market Cap (intraday)']}</p>
      <p><strong>Open:</strong> {payload.Open}</p>
      <p><strong>PE Ratio (TTM):</strong> {payload['PE Ratio (TTM)']}</p>
      <p><strong>Previous Close:</strong> {payload['Previous Close']}</p>
      <p><strong>Volume:</strong> {payload.Volume}</p>
    </div>
  );
};

export default StockDetailWidget;
