import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [65, 45, 75, 86, 56, 55, 40],
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(238, 168, 179, 0.8)");
          gradient.addColorStop(1, "rgba(196, 110, 136, 0.8)");
          return gradient;
        },
        borderColor: "rgba(238, 168, 179, 1)",
        borderWidth: 2,
        borderRadius: 8, // Rounded bar corners
        hoverBackgroundColor: "rgba(238, 168, 179, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures chart resizes properly
    animation: {
      duration: 1000, // Smooth animation
      easing: "easeInOutQuad",
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#fff", // Improve readability on dark UI
          font: {
            size: 14,
            family: "Arial",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#EEA8B3",
        bodyColor: "#fff",
        borderColor: "#EEA8B3",
        borderWidth: 1,
      },
      title: {
        display: true,
        text: "Monthly Sales Data",
        color: "#EEA8B3",
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ddd", // X-axis text color
          font: {
            size: 12,
          },
          autoSkip: true,
          maxRotation: 45,
          minRotation: 0,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Subtle grid lines
        },
      },
      y: {
        ticks: {
          color: "#ddd",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-[80vh] md:h-[90vh] my-10 p-4 bg-zinc-800 rounded-lg shadow-2xl border border-zinc-700/40">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart;
