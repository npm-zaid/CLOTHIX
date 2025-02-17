import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RiGlobalLine, RiEyeLine, RiShoppingCartLine } from "react-icons/ri";

const LiveTrafficMonitor = () => {
  const [activeUsers, setActiveUsers] = useState(12);
  const [topLocations, setTopLocations] = useState([
    { country: "USA", percent: 40 },
    { country: "India", percent: 30 },
    { country: "UK", percent: 20 },
  ]);
  const [topProducts, setTopProducts] = useState([
    { name: "Sneakers", views: 120 },
    { name: "Smartwatch", views: 98 },
    { name: "Headphones", views: 85 },
  ]);
  const [cartValue, setCartValue] = useState("₹15,320");

  // Simulating real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers((prev) => prev + Math.floor(Math.random() * 5) - 2);
      setCartValue(`₹${(Math.random() * 50000).toFixed(2)}`);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
        <RiGlobalLine className="text-3xl text-[#C46E88] bg-[#C46E88]/20 p-2 rounded-lg" />
        Live Website Traffic
      </h2>

      {/* Active Users */}
      <div className="mb-6 flex items-center gap-4">
        <RiEyeLine className="text-4xl text-[#EEA8B3]" />
        <div>
          <h3 className="text-white font-medium text-lg">Active Users</h3>
          <p className="text-zinc-300 text-sm">{activeUsers} users online</p>
        </div>
      </div>

      {/* Top Locations */}
      <h3 className="text-white text-lg font-medium mb-3">Top Locations</h3>
      <div className="space-y-3 mb-6">
        {topLocations.map((loc, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex flex-col gap-1"
          >
            <div className="flex justify-between items-center">
              <span className="text-white text-sm font-medium">{loc.country}</span>
              <span className="text-zinc-300 text-sm font-medium">{loc.percent}%</span>
            </div>
            <div className="w-full h-2 bg-zinc-700/50 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${loc.percent}%` }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[#C46E88] to-[#EEA8B3] shadow-md"
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Most Viewed Products */}
      <h3 className="text-white text-lg font-medium mb-3">Most Viewed Products</h3>
      <div className="space-y-4 mb-6">
        {topProducts.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex justify-between items-center bg-zinc-700/50 p-3 rounded-lg shadow-md hover:bg-zinc-700/30 transition-all duration-300 border border-zinc-700/30"
          >
            <span className="text-white font-medium">{product.name}</span>
            <span className="text-zinc-300">{product.views} views</span>
          </motion.div>
        ))}
      </div>

      {/* Current Cart Value */}
      <div className="flex items-center gap-4">
        <RiShoppingCartLine className="text-4xl text-[#EEA8B3]" />
        <div>
          <h3 className="text-white font-medium text-lg">Current Cart Value</h3>
          <p className="text-zinc-300 text-sm">{cartValue}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveTrafficMonitor;
