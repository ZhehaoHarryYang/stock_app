import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, zoomPlugin, PointElement);

const HistoricalDataChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const reversedData = [...data].reverse();

  const chartData = {
    labels: reversedData.map(item => item.Date),
    datasets: [
      {
        label: 'Adjusted Close Price',
        data: reversedData.map(item => parseFloat(item.AdjClose)),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `$${tooltipItem.raw.toFixed(2)}`,
        },
      },
      zoom: {
        zoom: {
          enabled: true,
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Adjusted Close Price',
        },
        grid: {
          borderDash: [2, 2],
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default HistoricalDataChart;
