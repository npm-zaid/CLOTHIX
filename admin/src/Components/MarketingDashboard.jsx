import { motion } from "framer-motion";
import { Doughnut, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { RiMegaphoneLine, RiBarChart2Line, RiMailLine, RiShareForwardLine } from "react-icons/ri";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

// Register Chart.js Components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const MarketingDashboard = () => {
  // Traffic Sources
  const [trafficData, setTrafficData] = useState({
    labels: ["Google Ads", "Social Media", "Direct", "Email Campaign", "Affiliates"],
    datasets: [
      {
        label: "Traffic Sources",
        data: [45, 25, 15, 10, 5], // Sample percentages
        backgroundColor: ["#C46E88", "#EEA8B3", "#8B5CF6", "#F59E0B", "#22C55E"],
        borderColor: "#222",
        borderWidth: 2,
      },
    ],
  });

  // Ad Campaign Performance (Bar Chart)
  const [adPerformance, setAdPerformance] = useState({
    labels: ["Campaign A", "Campaign B", "Campaign C"],
    datasets: [
      {
        label: "Conversions",
        data: [500, 320, 420],
        backgroundColor: ["#C46E88", "#EEA8B3", "#8B5CF6"],
        borderColor: "#333",
        borderWidth: 2,
      },
    ],
  });

  // Email Campaign Metrics
  const [emailStats, setEmailStats] = useState({
    openRate: 38, // Percentage
    clickRate: 22, // Percentage
  });

  useEffect(() => {
    // Simulating Real-time Marketing Data Updates
    const interval = setInterval(() => {
      setEmailStats({
        openRate: Math.floor(Math.random() * 20) + 30,
        clickRate: Math.floor(Math.random() * 10) + 15,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-800/90 w-full my-12 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-zinc-700/40 hover:shadow-[0px_0px_30px_rgba(238,168,179,0.15)] transition-all duration-300"
    >
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
        <RiMegaphoneLine className="text-3xl text-[#C46E88] bg-[#C46E88]/20 p-2 rounded-lg" />
        Marketing Performance Dashboard
      </h2>

      {/* Traffic Sources */}
      <h3 className="text-white text-lg font-medium mb-3 flex items-center gap-2">
        <RiBarChart2Line className="text-[#EEA8B3]" />
        Traffic Sources Breakdown
      </h3>
      <div className="mb-6 h-60 flex justify-center">
        <Doughnut data={trafficData} />
      </div>

      {/* Ad Campaign Performance */}
      <h3 className="text-white text-lg font-medium mb-3 flex items-center gap-2">
        <RiBarChart2Line className="text-[#EEA8B3]" />
        Ad Campaign Performance
      </h3>
      <div className="mb-6 h-60">
        <Bar data={adPerformance} />
      </div>

      {/* Email Campaign Performance */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-700/50 p-4 rounded-lg shadow-md border border-zinc-700/30 mb-6"
      >
        <div className="flex items-center gap-3">
          <RiMailLine className="text-3xl text-[#C46E88]" />
          <h3 className="text-white text-lg font-medium">Email Campaign Stats</h3>
        </div>
        <p className="text-zinc-300 text-sm mt-2">
          <strong>Open Rate:</strong> {emailStats.openRate}%  
        </p>
        <p className="text-zinc-300 text-sm mt-1">
          <strong>Click-through Rate:</strong> {emailStats.clickRate}%
        </p>
      </motion.div>

      {/* Social Media Engagement */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-700/50 p-4 rounded-lg shadow-md border border-zinc-700/30"
      >
        <div className="flex items-center gap-3">
          <RiShareForwardLine className="text-3xl text-[#EEA8B3]" />
          <h3 className="text-white text-lg font-medium">Social Media Engagement</h3>
        </div>
        <p className="text-zinc-300 text-sm mt-2">
          <strong>Instagram:</strong> 12.3K Likes, 900 Comments  
        </p>
        <p className="text-zinc-300 text-sm mt-1">
          <strong>Twitter:</strong> 5.8K Retweets, 3.1K Likes  
        </p>
        <p className="text-zinc-300 text-sm mt-1">
          <strong>Facebook:</strong> 15K Engagements  
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MarketingDashboard;
