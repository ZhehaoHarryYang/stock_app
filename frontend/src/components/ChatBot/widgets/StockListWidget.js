import React from 'react';

const StockListWidget = ({ payload }) => {
  return (
    <ul>
      {payload.map(stock => {
        const change = stock.changePer || stock.perChange; // Use changePer or perChange
        return (

          <li key={stock.symbol} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #e0e0e0', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{stock.name}</strong> ({stock.symbol})
              </div>
              <div style={{ color: change.startsWith('-') ? 'red' : 'green' }}>
                {change} | ${stock.price}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  );
};

export default StockListWidget;
