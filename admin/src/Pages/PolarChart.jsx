import React from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, RadialLinearScale, Tooltip, Legend);

const PolarChart = () => {
  const data = {
    labels: ["Men", "Women", "Kids", "Topwear", "Bottomwear"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 8, 10, 4],
        backgroundColor: [
          "rgba(245, 43, 90, 0.7)",  // Red
          "rgba(94, 169, 237, 0.7)", // Blue
          "rgba(175, 150, 244, 0.7)", // Purple
          "rgba(255, 242, 0, 0.7)", // Yellow
          "rgba(109, 198, 181, 0.7)", // Teal
        ],
        borderColor: [
          "rgba(245, 43, 90, 1)",
          "rgba(94, 169, 237, 1)",
          "rgba(175, 150, 244, 1)",
          "rgba(255, 242, 0, 1)",
          "rgba(109, 198, 181, 1)",
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          "rgba(245, 43, 90, 1)",
          "rgba(94, 169, 237, 1)",
          "rgba(175, 150, 244, 1)",
          "rgba(255, 242, 0, 1)",
          "rgba(109, 198, 181, 1)",
        ],
        hoverBorderColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Subtle grid lines
        },
        ticks: {
          stepSize: 2,
          color: "#ddd", // Tick labels color
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#fff",
          font: {
            size: 14,
          },
          padding: 15,
        },
      },
      title: {
        display: true,
        text: "Sales Based on Category",
        color: "#EEA8B3",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#EEA8B3",
        bodyColor: "#fff",
        borderColor: "#EEA8B3",
        borderWidth: 1,
      },
    },
    animation: {
      duration: 1500,
      easing: "easeInOutQuad",
    },
  };

  return (
    <div className="w-full h-[60vh] md:h-[75vh] my-10 p-6 bg-zinc-800 rounded-xl shadow-2xl border border-zinc-700/40">
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default PolarChart;
