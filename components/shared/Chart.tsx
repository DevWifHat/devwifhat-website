'use client'

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ArcElement, Tooltip, Legend, Chart as ChartJS } from 'chart.js';

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const dataValues = [25, 20, 15, 15, 12.5, 12.5]; // Updated data values
  const labels = ['Liquidity', 'Ecosystem Grants', 'Founders Vesting', 'Marketing & Operations', 'Airdrops', 'Ecosystem Development']; // Updated labels

  // Define the data structure for the Pie chart
  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          '#E63946', // Dark Red
          '#1D3557', // Dark Blue
          '#F4A261', // Dark Orange
          '#2A9D8F', // Dark Teal
          '#6D6875', // Dark Purple
          '#495057'  // Dark Grey
        ],
        hoverBackgroundColor: [
          '#E63946', // Dark Red
          '#1D3557', // Dark Blue
          '#F4A261', // Dark Orange
          '#2A9D8F', // Dark Teal
          '#6D6875', // Dark Purple
          '#495057'  // Dark Grey
        ]
      }
    ]
  };

  // Define options for the Pie chart (customize as needed)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Your Chart Title'
      }
    }
  };

  return <section className="w-full flex items-center justify-center">
    <div className="max-w-4xl mx-auto">
      <Pie data={data} options={options} />
    </div>
  </section>;
};

export default Chart;