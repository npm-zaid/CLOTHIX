import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, RadialLinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, RadialLinearScale, Tooltip, Legend);

const PolarChart = () => {

  
  const data = {
    labels: ['men','woman','kids','topwear','bottom'],
    
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 8, 10, 4],
        backgroundColor: [
          '#F52B5A',
          '#5EA9ED',
          '#AF96F4',
          '#FFF200',
          '#6DC6B5',
        ],
        borderWidth: 1,
        hoverBorderColor: '#000',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: { // Configure the radial axis
        beginAtZero: true,
        ticks: {
          stepSize: 2, // Adjust step size as needed
        },
      },
    },
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Sales Based On Category'
        }
    }
  };

  return (
    <div className='w-full sm:h-[90vh] h-[60vh] my-10'>
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default PolarChart;