'use client'

import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighCharts3D from 'highcharts/highcharts-3d';


if (typeof Highcharts === 'object') {
  HighCharts3D(Highcharts)
}



const HighCharts = () => {

  const options = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 55,
        beta: 0
      },
      backgroundColor: null // Set background to transparent
    },
    title: {
      enabled: false,
      text: '',
      align: 'center'
    },
    plotOptions: {
      pie: {
        innerSize: 0, // Consider specifying an innerSize if you want a donut chart. Remove if not needed.
        depth: 55,
        shadow: true,
        size: '90%',
        dataLabels: {
          enabled: true, // Enable data labels to show information on the chart
          format: '{point.name}: {point.y}%' // Customize as needed
        }
      }
    },
    series: [{
      name: 'Distribution',
      data: [
        { name: 'Liquidity', y: 25, color: '#E63946' },
        { name: 'Ecosystem Grants', y: 20, color: '#1D3557' },
        { name: 'Founders Vesting', y: 15, color: '#F4A261' },
        { name: 'Marketing & Operations', y: 15, color: '#2A9D8F' },
        { name: 'Airdrops', y: 12.5, color: '#6D6875' },
        { name: 'Ecosystem Development', y: 12.5, color: '#495057' }
      ]
    }],
    credits: {
      enabled: false // This line removes the Highcharts.com credits
    }
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  )
}

export default HighCharts