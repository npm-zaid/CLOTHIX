

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Chart from './Chart';
import { motion } from 'framer-motion';
import Circular from '../Components/Circular';


const Dashboard = ({ token }) => {
  const navigate = useNavigate();

  const [recentOrders, setRecentOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [orders, setOrders] = useState(0);
  const [products, setProducts] = useState(0);
  const [users, setUsers] = useState(0);

  const fetchRecentOrders = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, {
        headers: { token }
      });
      if (response.data.success) {
        // Get last 3 orders
        setRecentOrders(response.data.orders.slice(-3).reverse());
        // Total sales
        const totalSalesValue = response.data.orders.reduce((sum, order) => sum + order.amount, 0) / 100;
        startCountdown(totalSalesValue, setTotalSales);
        // Orders
        const ordersValue = response.data.orders.length;
        startCountdown(ordersValue, setOrders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    try {
      const res = await axios.get(backendUrl + '/api/product/list');
      if (res.data.success) {
        const productsValue = res.data.products.length;
        startCountdown(productsValue, setProducts);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    try {
      const res = await axios.post(backendUrl + '/api/user/allusers');
      if (res.data.success) {
        const usersValue = res.data.users.length;
        startCountdown(usersValue, setUsers);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const startCountdown = (targetValue, setValue) => {
    const duration = 2000; // 2 seconds
    const increment = targetValue / (duration / 16); // 60 FPS

    let currentValue = 0;
    const interval = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(interval);
      }
      setValue(Math.floor(currentValue));
    }, 16);
  };

  useEffect(() => {
    fetchRecentOrders();
  }, [token]);

  return (
    <div className="px-8 py-16 flex flex-col justify-between items-center">
    <motion.h1
  initial={{ opacity: 0, x: -150 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="sm:text-4xl text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#EEA8B3] to-[#C46E88] mb-10 flex items-center gap-5 tracking-wide"
>
  <motion.i
    whileHover={{ scale: 1.1, rotate: 360 }}
    className="ri-dashboard-3-line text-[#EEA8B3] sm:text-5xl text-4xl shadow-md"
  ></motion.i>
  Dashboard Overview
</motion.h1>


      <motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full"
>
  {[
    { label: "Total Sales", value: `₹${totalSales}`, change: "+12%", icon: "ri-coins-line", color: "#C46E88", trend: "up" },
    { label: "Total Orders", value: orders, change: "+8%", icon: "ri-shopping-bag-3-line", color: "#EEA8B3", trend: "up" },
    { label: "Total Products", value: products, change: "-3%", icon: "ri-store-3-line", color: "#8B5CF6", trend: "down" },
    { label: "Total Users", value: users, change: "+15%", icon: "ri-team-line", color: "#F59E0B", trend: "up" },
  ].map((stat, index) => (
    <motion.div 
      key={index} 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-zinc-800/80 backdrop-blur-xl p-6 rounded-xl shadow-xl border-l-4 transition-all duration-300 hover:shadow-2xl"
      style={{ borderColor: stat.color }}
    >
      {/* Card Content */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-400 font-medium">{stat.label}</p>
          <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
        </div>
        <div className="p-3 bg-gradient-to-br rounded-full shadow-lg" style={{ background: `${stat.color}20` }}>
          <i className={`${stat.icon} text-3xl`} style={{ color: stat.color }}></i>
        </div>
      </div>

      {/* Trend Indicator */}
      <p className={`text-xs mt-2 flex items-center gap-1 ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
        <i className={stat.trend === "up" ? "ri-arrow-up-circle-fill" : "ri-arrow-down-circle-fill"}></i> 
        {stat.change} from last month
      </p>
    </motion.div>
  ))}
</motion.div>



  {/* Sales Analytics */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
  <motion.div 
  initial={{ opacity: 0, x: -100 }}
  animate={{ opacity: 1, x: 0 }}
  whileHover={{ scale: 1.03 }}
  transition={{ duration: 0.5 }}
  className="bg-zinc-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-zinc-700/40 hover:shadow-[0px_0px_30px_rgba(238,168,179,0.15)] transition-all duration-300"
>
  {/* Header */}
  <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
    <i className="ri-money-dollar-box-line text-3xl text-[#C46E88] bg-[#C46E88]/20 p-2 rounded-lg"></i>
    <span>Sales by Category</span>
  </h2>

  {/* Category List */}
  <div className="space-y-5">
    {[
      { name: "Men's", percent: 75 },
      { name: "Women's", percent: 40 },
      { name: "Kids", percent: 50 },
    ].map((category, index) => (
      <motion.div 
        key={index} 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <div className="flex justify-between items-center">
          <span className="text-white text-sm font-medium">{category.name}</span>
          <span className="text-zinc-300 text-sm font-medium">{category.percent}%</span>
        </div>
        <div className="w-full h-2 bg-zinc-700/50 rounded-full overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${category.percent}%` }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full rounded-full bg-gradient-to-r from-[#C46E88] to-[#EEA8B3] shadow-md"
          
          ></motion.div>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>

<motion.div 
  initial={{ opacity: 0, x: 100 }}
  animate={{ opacity: 1, x: 0 }}
  whileHover={{ scale: 1.03 }}
  transition={{ duration: 0.5 }}
  className="bg-zinc-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-zinc-700/40 hover:shadow-[0px_0px_30px_rgba(238,168,179,0.15)] transition-all duration-300"
>
  {/* Header */}
  <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
    <i className="ri-fire-line text-[#EEA8B3] bg-[#EEA8B3]/20 p-2 rounded-lg"></i>
    Top Selling Products
  </h2>

  {/* Product List */}
  <div className="space-y-5">
    {[
      { name: "Winter Jacket", sales: 142, price: "₹1,299", icon: "ri-t-shirt-2-line", color: "#EEA8B3" },
      { name: "Denim Jeans", sales: 121, price: "₹1,499", icon: "ri-run-line", color: "#EEA8B3" },
    ].map((product, index) => (
      <motion.div 
        key={index} 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="flex items-center justify-between bg-zinc-700/50 p-4 rounded-lg hover:bg-zinc-700/30 transition-all duration-300 border border-zinc-700/30 hover:border-[#EEA8B3]/40 shadow-md hover:shadow-lg"
      >
        {/* Left Side */}
        <div className="flex items-center">
          <div className="w-14 h-14 bg-zinc-700 rounded-xl mr-4 flex items-center justify-center shadow-lg" style={{ borderColor: product.color }}>
            <i className={`${product.icon} text-3xl`} style={{ color: product.color }}></i>
          </div>
          <div>
            <h3 className="text-white font-medium text-lg">{product.name}</h3>
            <p className="text-zinc-400 text-sm">{product.sales} sales</p>
          </div>
        </div>

        {/* Price */}
        <span className="text-[#EEA8B3] font-semibold text-lg">{product.price}</span>
      </motion.div>
    ))}
  </div>
</motion.div>


  </div>

<Chart></Chart>


{/* Recent Orders Table */}
<div className="bg-zinc-800 rounded-lg shadow-md p-6 w-full mb-8 hover:shadow-xl transition-all duration-300 border-l-4 border-[#C46E88]">
  <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
    <i className="ri-time-line text-[#C46E88]"></i>
    Recent Orders
  </h2>
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-zinc-700/50 border-b-2 border-[#C46E88]/20">
          <th className="px-6 py-3 text-left text-sm font-medium text-[#EEA8B3]">
            <div className="flex items-center gap-2">
              <i className="ri-hashtag"></i>
              Order ID
            </div>
          </th>
          <th className="px-6 py-3 text-left text-sm font-medium text-[#EEA8B3]">
            <div className="flex items-center gap-2">
              <i className="ri-user-smile-line"></i>
              Customer
            </div>
          </th>
          <th className="px-6 py-3 text-left text-sm font-medium text-[#EEA8B3]">
            <div className="flex items-center gap-2">
              <i className="ri-shopping-bag-line"></i>
              Product
            </div>
          </th>
          <th className="px-6 py-3 text-left text-sm font-medium text-[#EEA8B3]">
            <div className="flex items-center gap-2">
              <i className="ri-money-rupee-circle-line"></i>
              Amount
            </div>
          </th>
          <th className="px-6 py-3 text-left text-sm font-medium text-[#EEA8B3]">
            <div className="flex items-center gap-2">
              <i className="ri-truck-line"></i>
              Status
            </div>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-700/30">
        {recentOrders.map((order) => (
        
           
              <tr key={order._id} className="hover:bg-zinc-700/30 transition-colors duration-200">
                <td className="px-6 py-4 text-sm">
                  <span className="text-[#EEA8B3] font-medium">#{order._id.slice(-5)}</span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center text-[#EEA8B3]">
                      <i className="ri-user-line"></i>
                    </div>
                    <span className="text-gray-300">{order.address.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center text-[#EEA8B3]">
                      <i className="ri-shopping-bag-line"></i>
                    </div>
                    
                    {order.items.map((i)=>( <span className="text-gray-300">{i.name}</span>))}
                   
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="text-[#EEA8B3] font-medium">₹{(order.amount/100).toFixed(2)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1.5 text-xs rounded-full font-medium flex items-center gap-1 w-fit
                    ${order.status === 'processing' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-600' :
                    order.status === 'completed' ? 'bg-green-900/50 text-green-300 border border-green-600' :
                    order.status === 'cancelled' ? 'bg-red-900/50 text-red-300 border border-red-600' :
                    order.status === 'shipped' ? 'bg-blue-900/50 text-blue-300 border border-blue-600' :
                    order.status === 'out for delivery' ? 'bg-orange-900/50 text-orange-300 border border-orange-600' :
                    order.status === 'returned' ? 'bg-purple-900/50 text-purple-300 border border-purple-600' :
                    'bg-zinc-900/50 text-zinc-300 border border-zinc-600'}`}
                  >
                    <i className={`${
                      order.status === 'processing' ? 'ri-loader-4-line' :
                      order.status === 'completed' ? 'ri-checkbox-circle-line' :
                      order.status === 'cancelled' ? 'ri-close-circle-line' :
                      order.status === 'shipped' ? 'ri-ship-line' :
                      order.status === 'out for delivery' ? 'ri-truck-line' :
                      order.status === 'returned' ? 'ri-arrow-go-back-line' :
                      'ri-question-line'
                    }`}></i>
                    <span className='text-nowrap'>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                  </span>
                </td>
              </tr>
          
         
        ))}
      </tbody>
    </table>
  </div>
</div>

{/* Revenue Analytics */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
  {/* Monthly Revenue Card */}
  <div className="bg-zinc-800/90 backdrop-blur-lg rounded-xl shadow-2xl p-6 hover:scale-[1.02] transition-transform border border-zinc-700/30">
    <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-3">
      <i className="ri-money-dollar-box-line text-3xl text-[#C46E88]"></i>
      <span>Monthly Revenue</span>
    </h2>
    <div className="space-y-5">
      {/* January */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-zinc-300 text-sm font-medium">January</span>
          <span className="text-zinc-300 text-sm font-medium">₹32,450</span>
        </div>
        <div className="w-full h-2 bg-zinc-700/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C46E88] to-[#EEA8B3] rounded-full transition-all duration-1000"
            style={{ width: '66.67%' }}
          ></div>
        </div>
      </div>

      {/* February */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-zinc-300 text-sm font-medium">February</span>
          <span className="text-zinc-300 text-sm font-medium">₹40,450</span>
        </div>
        <div className="w-full h-2 bg-zinc-700/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C46E88] to-[#EEA8B3] rounded-full transition-all duration-1000"
            style={{ width: '70%' }}
          ></div>
        </div>
      </div>

      {/* March */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-zinc-300 text-sm font-medium">March</span>
          <span className="text-zinc-300 text-sm font-medium">₹20,050</span>
        </div>
        <div className="w-full h-2 bg-zinc-700/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C46E88] to-[#EEA8B3] rounded-full transition-all duration-1000"
            style={{ width: '45%' }}
          ></div>
        </div>
      </div>
    </div>
  </div>

  {/* Customer Demographics Card */}
  <div className="bg-zinc-800/90 backdrop-blur-lg rounded-xl shadow-2xl p-6 hover:scale-[1.02] transition-transform border border-zinc-700/30">
    <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-3">
      <i className="ri-group-line text-3xl text-[#EEA8B3]"></i>
      <span>Customer Demographics</span>
    </h2>
    <div className="space-y-5">
      {/* 18-24 years */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-zinc-300 text-sm font-medium">18-24 years</span>
          <span className="text-zinc-300 text-sm font-medium">25%</span>
        </div>
        <div className="w-full h-2 bg-zinc-700/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C46E88] to-[#EEA8B3] rounded-full transition-all duration-1000"
            style={{ width: '25%' }}
          ></div>
        </div>
      </div>

      {/* 25-34 years */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-zinc-300 text-sm font-medium">25-34 years</span>
          <span className="text-zinc-300 text-sm font-medium">40%</span>
        </div>
        <div className="w-full h-2 bg-zinc-700/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C46E88] to-[#EEA8B3] rounded-full transition-all duration-1000"
            style={{ width: '40%' }}
          ></div>
        </div>
      </div>

      {/* 35+ years */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-zinc-300 text-sm font-medium">35+ years</span>
          <span className="text-zinc-300 text-sm font-medium">60%</span>
        </div>
        <div className="w-full h-2 bg-zinc-700/50 rounded-full overflow-hidden">
          <div
       className="h-full bg-gradient-to-r from-[#C46E88] to-[#EEA8B3] rounded-full transition-all duration-1000"
            style={{ width: '60%' }}
          ></div>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Quick Actions */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12 w-full">
  {[
    { 
      title: "Add New Product", 
      description: "Quickly add new products to your inventory", 
      icon: "ri-add-line", 
      colorFrom: "#C46E88", 
      colorTo: "#EEA8B3", 
      route: "/add" 
    },
    { 
      title: "Process Orders", 
      description: "View, Process and Update pending orders", 
      icon: "ri-shopping-cart-line", 
      colorFrom: "#8B5CF6", 
      colorTo: "#C46E88", 
      route: "/orders" 
    },
    { 
      title: "Generate Report", 
      description: "Create detailed sales and inventory reports", 
      icon: "ri-file-chart-line", 
      colorFrom: "#F59E0B", 
      colorTo: "#EEA8B3", 
      route: "/reports" 
    }
  ].map((card, index) => (
    <div 
      key={index}
      className="relative bg-zinc-800/90 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-zinc-700/50 
      transition-all duration-300 hover:shadow-[0px_0px_25px_rgba(238,168,179,0.2)] hover:scale-105 
      group overflow-hidden"
    >
      {/* Glowing Background Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
        style={{ 
          background: `radial-gradient(circle at top left, ${card.colorFrom}40, transparent 70%)`
        }}
      ></div>

      {/* Header Section */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-xl font-semibold text-white">{card.title}</h3>
        <div 
          className="p-4 bg-zinc-700 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-110" 
          style={{ backgroundColor: `${card.colorFrom}30` }}
        >
          <i className={`${card.icon} text-3xl`} style={{ color: card.colorFrom }}></i>
        </div>
      </div>

      {/* Description */}
      <p className="text-zinc-400 text-sm relative z-10">{card.description}</p>

      {/* Button */}
      <button 
        onClick={() => navigate(card.route)}
        className="mt-6 w-full py-3 rounded-lg text-white font-medium text-sm 
        transition-all duration-300 hover:scale-105 active:scale-95 shadow-md 
        relative z-10"
        style={{ background: `linear-gradient(to right, ${card.colorFrom}, ${card.colorTo})` }}
      >
        {card.title}
      </button>
    </div>
  ))}
</div>


{/* Inventory Status */}
<div className="bg-zinc-800 rounded-xl shadow-lg p-6 w-full border border-zinc-700/50">
  {/* Header */}
  <h2 className="text-xl font-semibold mb-5 text-white flex items-center gap-3">
    <i className="ri-alert-line text-[#EEA8B3] bg-[#EEA8B3]/20 p-2 rounded-lg"></i>
    Low Stock Alert
  </h2>

  {/* Low Stock Items List */}
  <div className="space-y-4">
    {[
      { name: "Black T-Shirt", stock: 5, icon: "ri-t-shirt-line", color: "#EEA8B3" },
      { name: "Blue shirt", stock: 3, icon: "ri-shirt-line", color: "#C46E88" },
      { name: "logger", stock: 2, icon: "ri-run-line", color: "#8B5CF6" },
    ].map((item, index) => (
      <div 
        key={index} 
        className="flex sm:flex-row flex-col sm:gap-0 gap-5 items-center justify-between p-5 bg-zinc-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-zinc-600 hover:border-[#EEA8B3]/50"
      >
        {/* Item Info */}
        <div className="flex items-center gap-4">
          <div 
            className="w-14 h-14 bg-zinc-600 rounded-lg flex items-center justify-center shadow-md"
            style={{ borderColor: item.color }}
          >
            <i className={`${item.icon} text-2xl`} style={{ color: item.color }}></i>
          </div>
          <div>
            <h3 className="text-white font-medium">{item.name}</h3>
            <p className="text-zinc-400 text-sm">Only {item.stock} items left</p>
          </div>
        </div>

        {/* Restock Button */}
        <button 
          className="px-5 py-2 bg-[#C46E88] sm:w-fit w-full text-white font-medium rounded-lg shadow-md hover:bg-[#EEA8B3] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Restock
        </button>
      </div>
    ))}
  </div>
</div>



    </div>
  );
};

export default Dashboard;