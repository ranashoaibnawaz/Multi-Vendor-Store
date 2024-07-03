import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './SalesCard.css';

// Register components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const SalesCard = ({ title, data, labels }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,12,12)',
      },
    ],
  };

  return (
    <div className="sales-card">
      <h2>{title}</h2>
      <Line data={chartData} />
    </div>
  );
};

export default SalesCard;
