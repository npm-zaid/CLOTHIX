import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { RiBarChartBoxLine, RiRobot2Line, RiLineChartLine } from "react-icons/ri";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js Components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const SalesPrediction = () => {
  // Initial Sales Data
  const initialSalesData = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 14500 },
    { month: "Mar", sales: 18000 },
    { month: "Apr", sales: 20000 },
    { month: "May", sales: 22000 },
    { month: "Jun", sales: 25000 },
  ];

  const [salesData, setSalesData] = useState(initialSalesData);
  const [growthRate, setGrowthRate] = useState(12.5);
  const [aiInsight, setAiInsight] = useState("AI predicts a 12.5% growth in sales next month due to rising demand.");

  // Simulated AI Prediction Update
  useEffect(() => {
    const interval = setInterval(() => {
      const lastMonth = salesData[salesData.length - 1];
      const predictedSales = Math.round(lastMonth.sales * (1 + growthRate / 100));
      const newMonth = { month: "Jul", sales: predictedSales };

      setSalesData([...salesData, newMonth]);
      setAiInsight(`AI forecasts a ${growthRate}% sales increase in July, driven by seasonal demand & promotions.`);
    }, 5000);

    return () => clearInterval(interval);
  }, [salesData]);

  // Prepare Data for Chart.js
  const chartData = {
    labels: salesData.map((data) => data.month),
    datasets: [
      {
        label: "Sales (₹)",
        data: salesData.map((data) => data.sales),
        fill: false,
        backgroundColor: "#C46E88",
        borderColor: "#EEA8B3",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: "#ccc" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
      y: {
        ticks: { color: "#ccc" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
    },
    plugins: {
      legend: {
        labels: { color: "#EEA8B3" },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-800/90 w-full backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-zinc-700/40 hover:shadow-[0px_0px_30px_rgba(238,168,179,0.15)] transition-all duration-300"
    >
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
        <RiLineChartLine className="text-3xl text-[#C46E88] bg-[#C46E88]/20 p-2 rounded-lg" />
        AI-Powered Sales Prediction
      </h2>

      {/* Sales Forecast Chart */}
      <div className="mb-6 h-64">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Growth Rate */}
      <div className="mb-6 flex items-center gap-4">
        <RiBarChartBoxLine className="text-4xl text-[#EEA8B3]" />
        <div>
          <h3 className="text-white font-medium text-lg">Predicted Growth Rate</h3>
          <p className="text-zinc-300 text-sm">{growthRate}% next month</p>
        </div>
      </div>

      {/* AI Insight Box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-700/50 p-4 rounded-lg shadow-md border border-zinc-700/30"
      >
        <div className="flex items-center gap-3">
          <RiRobot2Line className="text-3xl text-[#C46E88]" />
          <h3 className="text-white text-lg font-medium">AI Insights</h3>
        </div>
        <p className="text-zinc-300 text-sm mt-2">{aiInsight}</p>
      </motion.div>
    </motion.div>
  );
};

export default SalesPrediction;
