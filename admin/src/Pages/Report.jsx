import React, { useState, useEffect,useRef } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import Chart from './Chart'
import PolarChart from './PolarChart'
import Circular from '../Components/Circular'

const Report = ({token}) => {
  


  const [reportData, setReportData] = useState({
    totalSales: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    ordersByStatus: {},
    recentOrders: []
  })

  const fetchReportData = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, {
        headers: { token }
      })
      
      if (response.data.success) {
        const orders = response.data.orders
        
        // Calculate metrics
        const totalSales = orders.reduce((sum, order) => sum + order.amount,0)
        const totalOrders = orders.length
        const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0
        startCountdown(totalSales, "totalSales")
        startCountdown(totalOrders, "totalOrders")
        startCountdown(averageOrderValue, "averageOrderValue")
        
        // Count orders by status
        const ordersByStatus = orders.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1
          console.log(acc)
          return acc
          
        }, {})

      

        setReportData({
          totalSales,
          totalOrders,
          averageOrderValue,
          ordersByStatus,
          recentOrders: orders.slice(-5).reverse()
        })
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const startCountdown = (targetValue, key) => {
    const duration = 2000; // 2 seconds
    const increment = targetValue / (duration / 16); // 60 FPS
  
    let currentValue = 0;
    const interval = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(interval);
      }
  
      // Properly update the state object
      setReportData(prevState => ({
        ...prevState,
        [key]: Math.floor(currentValue)
      }));
    }, 16);
  };
  

  useEffect(() => {
    fetchReportData()
    
  }, [token])

 



  return (
    <motion.div 
  
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" px-8 py-16 w-full"
    >
      <motion.h1 
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-bold text-white mb-8 flex items-center gap-3"
      >
        <i className="ri-file-chart-line text-[#EEA8B3]"></i>
        Sales Report
      </motion.h1>

      {/* Summary Cards */}
      <motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3, duration: 0.5 }}
  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8"
>
  {[
    {
      title: "Total Sales",
      value: `₹${(reportData.totalSales / 100).toFixed(2)}`,
      icon: "ri-line-chart-fill",
      borderColor: "#EEA8B3",
      bgColor: "bg-[#EEA8B3]/10",
      desc: "Total revenue generated",
      descIcon: "ri-arrow-up-circle-line",
      descColor: "text-green-400"
    },
    {
      title: "Total Orders",
      value: reportData.totalOrders,
      icon: "ri-shopping-bag-3-fill",
      borderColor: "#C46E88",
      bgColor: "bg-[#C46E88]/10",
      desc: "Total processed orders",
      descIcon: "ri-archive-line",
      descColor: "text-blue-400"
    },
    {
      title: "Average Order Value",
      value: `₹${(reportData.averageOrderValue / 100).toFixed(2)}`,
      icon: "ri-funds-box-fill",
      borderColor: "#EEA8B3",
      bgColor: "bg-[#EEA8B3]/10",
      desc: "Average revenue per order",
      descIcon: "ri-exchange-funds-line",
      descColor: "text-yellow-400"
    }
  ].map((card, index) => (
    <motion.div 
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`bg-zinc-800/80 backdrop-blur-lg p-6 rounded-xl shadow-xl border-l-4 border-[${card.borderColor}] transition-all duration-300 relative overflow-hidden`}
    >

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm text-zinc-400 flex items-center gap-2">
            <i className={`ri-money-rupee-circle-line text-[${card.borderColor}]`}></i>
            {card.title}
          </h3>
          <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
        </div>
        <div className={`w-14 h-14 ${card.bgColor} rounded-xl flex items-center justify-center shadow-lg`}>
          <i className={`${card.icon} text-3xl`} style={{ color: card.borderColor }}></i>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-700 flex items-center gap-2 text-sm text-zinc-400">
        <i className={`${card.descIcon} ${card.descColor}`}></i>
        {card.desc}
      </div>
    </motion.div>
  ))}
</motion.div>


      <Circular totalSales={70} salesTarget={100} totalOrders={50} completedOrders={30} customerRating={4.5} websiteVisitors={100} activeUsers={80} />


      <Chart></Chart>
      <PolarChart></PolarChart>
      

      {/* Orders by Status */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-zinc-800 p-8 rounded-2xl shadow-xl mb-8 hover:shadow-2xl transition-all duration-300 border border-zinc-700/50"
      >
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <i className="ri-pie-chart-2-line text-[#EEA8B3] bg-[#EEA8B3]/10 p-2 rounded-lg"></i>
          Orders by Status
        </h2>
        <div className="grid grid-cols-1  lg:grid-cols-5 gap-6">
          {Object.entries(reportData.ordersByStatus).map(([status, count], index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              key={status} 
              className="bg-zinc-700 p-6 rounded-xl hover:bg-zinc-700/50 transition-all duration-300 border border-zinc-700/30 hover:border-[#EEA8B3]/30 group shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_2px_12px_rgba(238,168,179,0.15)]"
            >
              <h4 className="text-sm font-medium text-zinc-400 mb-3   flex items-center gap-2">
                <i className={`text-lg ${
                  status === 'processing' ? 'ri-refresh-line text-amber-400 group-hover:animate-spin' :
                  status === 'completed' ? 'ri-check-double-line text-emerald-400' : 
                  status === 'cancelled' ? 'ri-close-circle-line text-rose-400' :
                  status === 'shipped' ? 'ri-ship-line text-sky-400' :
                  status === 'out for delivery' ? 'ri-truck-line text-orange-400' :
                  status === 'returned' ? 'ri-exchange-line text-violet-400' : 
                  'ri-question-line text-gray-400'
                }`}></i>
                {status}
              </h4>
              <p className="text-3xl font-bold bg-gradient-to-r from-[#EEA8B3] to-[#C46E88] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">{count}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Orders Table */}
      <div className="bg-zinc-800 rounded-lg shadow-md p-6 w-full mb-8 hover:shadow-xl transition-all duration-300 border-l-4 border-[#C46E88]">
        <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
          <i className="ri-time-line text-[#C46E88]"></i>
          Recent Orders
        </h2>
        <div className="overflow-x-scroll scroller">
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
              {reportData.recentOrders.map((order) => (
              
                 
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
                      <td className="px-6 py-4 text-sm ">
                        <div className="flex items-center gap-3 ">
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
    </motion.div>
  )
}

export default Report
