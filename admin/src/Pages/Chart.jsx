import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 45, 75, 86, 56, 55, 40],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Important for better responsiveness
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales Data',
      },
    },
    scales: { // Important for adjusting axis on smaller screens
      x: {
        ticks: {
          autoSkip: true, // Prevents overlapping labels
          maxRotation: 45, // Rotates labels if necessary
          minRotation: 0
        }
      },
      y: {
        beginAtZero: true // Start y-axis at 0
      }
    }
  };

  return (
    <div className='w-full h-[90vh] my-10'> {/* Important: Set container dimensions */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart;
