import { motion } from "framer-motion";

const CircularProgress = ({ percentage, label, color }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center bg-zinc-800/80 backdrop-blur-lg p-6 rounded-xl shadow-xl hover:shadow-lg transition-all duration-300 border-l-4"
      style={{ borderColor: color }} // ✅ Fixed: Dynamic Border Color
    >
      <div className="relative w-24 h-24">
        <svg width="100" height="100" viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#333" strokeWidth="8" />
          {/* Animated Progress Circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: progressOffset }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
        {/* Percentage Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-lg font-semibold">{percentage}%</span>
        </div>
      </div>
      {/* Label */}
      <p className="text-sm text-zinc-300 mt-3">{label}</p>
    </motion.div>
  );
};

// Dashboard with Multiple Indicators
const Circular = ({ totalSales, salesTarget, totalOrders, completedOrders, customerRating, websiteVisitors, activeUsers }) => {
  // Calculate percentages
  const salesCompletion = Math.round((totalSales / salesTarget) * 100);
  const orderFulfillment = Math.round((completedOrders / totalOrders) * 100);
  const customerSatisfaction = Math.round((customerRating / 5) * 100);
  const websiteEngagement = Math.round((activeUsers / websiteVisitors) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Sales Target Completion */}
      <CircularProgress percentage={salesCompletion} label="Sales Target" color="#EEA8B3" />

      {/* Order Fulfillment Rate */}
      <CircularProgress percentage={orderFulfillment} label="Order Fulfillment" color="#4ADE80" />

      {/* Customer Satisfaction Score */}
      <CircularProgress percentage={customerSatisfaction} label="Customer Satisfaction" color="#FACC15" />

      {/* Website Engagement Rate */}
      <CircularProgress percentage={websiteEngagement} label="Website Engagement" color="#60A5FA" />
    </div>
  );
};

export default Circular;
