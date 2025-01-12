import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl } from  '../App'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Chart from './Chart'


const Dashboard = ({token}) => {


  

  const navigate = useNavigate();

  const [recentOrders, setRecentOrders] = useState([])
  const [totalSales, setTotalSales] = useState(0)
  const [orders, setOrders] = useState(0)
  const [products, setProducts] = useState(0)
  const [users, setUsers] = useState(0)

  const fetchRecentOrders = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, {
        headers: { token }
      })
      if (response.data.success) {
        // Get last 3 orders
        setRecentOrders(response.data.orders.slice(-3).reverse())
        //total
        setTotalSales(response.data.orders.reduce((sum, order) => sum + order.amount,0)/100)
        // orders
        setOrders(response.data.orders.length)

      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

    try {
      const res = await axios.get(backendUrl + '/api/product/list')
      if(res.data.success){
        setProducts(res.data.products.length)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

    try {
      const res = await axios.post(backendUrl + '/api/user/allusers')
      if(res.data.success){
        setUsers(res.data.users.length)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchRecentOrders()
  }, [token])

  return (
    <div className=" px-8 py-16 flex flex-col justify-between items-center">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#EEA8B3] to-[#C46E88] mb-10 flex items-center gap-4">
        <i className="ri-dashboard-3-line text-[#EEA8B3] text-4xl"></i>
        Dashboard Overview
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 sm:w-fit w-full">
        {/* Stats Cards */}
        <div className="bg-zinc-800/80 backdrop-blur p-6 rounded-lg shadow-xl border-l-4 border-[#C46E88] transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400 font-medium">Total Sales</p>
              <h3 className="text-2xl font-bold text-white mt-1">{totalSales}</h3>
            </div>
            <div className="p-3 bg-gradient-to-br from-[#C46E88]/20 to-transparent rounded-full">
              <i className="ri-coins-line text-2xl text-[#C46E88]"></i>
            </div>
          </div>
          <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
            <i className="ri-arrow-up-circle-fill"></i> 12% from last month
          </p>
        </div>

        <div className="bg-zinc-800/80 backdrop-blur p-6 rounded-lg shadow-xl border-l-4 border-[#EEA8B3] transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400 font-medium">Total Orders</p>
              <h3 className="text-2xl font-bold text-white mt-1">{orders}</h3>
            </div>
            <div className="p-3 bg-gradient-to-br from-[#EEA8B3]/20 to-transparent rounded-full">
              <i className="ri-shopping-bag-3-line text-2xl text-[#EEA8B3]"></i>
            </div>
          </div>
          <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
            <i className="ri-arrow-up-circle-fill"></i> 8% from last month
          </p>
        </div>

        <div className="bg-zinc-800/80 backdrop-blur p-6 rounded-lg shadow-xl border-l-4 border-[#C46E88] transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400 font-medium">Total Products</p>
              <h3 className="text-2xl font-bold text-white mt-1">{products}</h3>
            </div>
            <div className="p-3 bg-gradient-to-br from-[#C46E88]/20 to-transparent rounded-full">
              <i className="ri-store-3-line text-2xl text-[#C46E88]"></i>
            </div>
          </div>
          <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
            <i className="ri-arrow-down-circle-fill"></i> 3% from last month
          </p>
        </div>

        <div className="bg-zinc-800/80 backdrop-blur p-6 rounded-lg shadow-xl border-l-4 border-[#EEA8B3] transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400 font-medium">Total Users</p>
              <h3 className="text-2xl font-bold text-white mt-1">{users}</h3>
            </div>
            <div className="p-3 bg-gradient-to-br from-[#EEA8B3]/20 to-transparent rounded-full">
              <i className="ri-team-line text-2xl text-[#EEA8B3]"></i>
            </div>
          </div>
          <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
            <i className="ri-arrow-up-circle-fill"></i> 15% from last month
          </p>
        </div>
      </div>

      {/* Sales Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full">
        <div className="bg-zinc-800 rounded-lg shadow-md p-6 hover:scale-102 transition-transform">
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <i className="ri-pie-chart-line text-[#C46E88]"></i>
            Sales by Category
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center gap-5">
              <span className="text-zinc-300">Men's</span>
              <div className="flex w-full items-center">
                <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C46E88] w-[75%] transition-all duration-1000"></div>
                </div>
              </div>
              <span className=" text-zinc-300">75%</span>
            </div>

            <div className="flex justify-between items-center gap-5">
              <span className="text-zinc-300">Woman's</span>
              <div className="flex w-full items-center">
                <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C46E88] w-[50%] transition-all duration-1000"></div>
                </div>
              </div>
              <span className=" text-zinc-300">50%</span>
            </div>

            <div className="flex justify-between items-center gap-5">
              <span className="text-zinc-300">Kid's</span>
              <div className="flex w-full items-center">
                <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C46E88] w-[30%] transition-all duration-1000"></div>
                </div>
              </div>
              <span className=" text-zinc-300">30%</span>
            </div>
           
           
          </div>
        </div>

        <div className="bg-zinc-800 rounded-lg shadow-md p-6 hover:scale-102 transition-transform">
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <i className="ri-fire-line text-[#EEA8B3]"></i>
            Top Selling Products
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-zinc-700 rounded-lg mr-4 flex items-center justify-center">
                  <i className="ri-t-shirt-2-line text-2xl text-[#EEA8B3]"></i>
                </div>
                <div>
                  <h3 className="text-zinc-300 font-medium">Winter Jacket</h3>
                  <p className="text-zinc-400 text-sm">142 sales</p>
                </div>
              </div>
              <span className="text-[#EEA8B3] font-medium">₹1,299</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-zinc-700 rounded-lg mr-4 flex items-center justify-center">
                  <i className="ri-shirt-line text-2xl text-[#C46E88]"></i>
                </div>
                <div>
                  <h3 className="text-zinc-300 font-medium">Denim Jeans</h3>
                  <p className="text-zinc-400 text-sm">121 sales</p>
                </div>
              </div>
              <span className="text-[#EEA8B3] font-medium">₹1,499</span>
            </div>
          </div>
        </div>
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
        <div className="bg-zinc-800 rounded-lg shadow-md p-6 hover:scale-102 transition-transform">
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <i className="ri-money-dollar-box-line text-[#C46E88]"></i>
            Monthly Revenue
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center gap-5">
              <span className="text-zinc-300">January</span>
                <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C46E88] w-[66.67%] transition-all duration-1000"></div>
              </div>
              <span className=" text-zinc-300">₹32,450</span>
            </div>

            <div className="flex justify-between items-center gap-5">
              <span className="text-zinc-300">February</span>
                <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C46E88] w-[70%] transition-all duration-1000"></div>
              </div>
              <span className=" text-zinc-300">₹40,450</span>
            </div>

            <div className="flex justify-between items-center gap-5">
              <span className="text-zinc-300">March</span>
                <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C46E88] w-[45%] transition-all duration-1000"></div>
              </div>
              <span className=" text-zinc-300">₹20,050</span>
            </div>


          </div>
        </div>

        <div className="bg-zinc-800 rounded-lg shadow-md p-6 hover:scale-102 transition-transform">
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <i className="ri-group-line text-[#EEA8B3]"></i>
            Customer Demographics
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center gap-5">
              <span className="text-zinc-300 text-nowrap">18-24 years</span>
                <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#EEA8B3] w-[25%] transition-all duration-1000"></div>
                </div>
                <span className=" text-zinc-300">25%</span>
            </div>

            <div className="flex justify-between items-center gap-5">
              <span className="text-zinc-300 text-nowrap">25-34 years</span>
                <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#EEA8B3] w-[40%] transition-all duration-1000"></div>
                </div>
                <span className=" text-zinc-300">40%</span>
            </div>

            <div className="flex justify-between items-center gap-5">
              <span className="text-zinc-300 text-nowrap">35+ years</span>
                <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#EEA8B3] w-[60%] transition-all duration-1000"></div>
                </div>
                <span className=" text-zinc-300">60%</span>
            </div>
          
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 w-full">
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 border-t-4 border-[#C46E88] group hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white group-hover:text-[#C46E88] transition-colors">Add New Product</h3>
            <div className="p-3 bg-zinc-700 rounded-full group-hover:bg-[#C46E88] transition-colors">
              <i className="ri-add-line text-2xl text-[#C46E88] group-hover:text-white"></i>
            </div>
          </div>
          <p className="text-zinc-400 text-sm">Quickly add new products to your inventory</p>
          <button 
            onClick={() => navigate('/add')}
            className="mt-4 w-full py-2 bg-zinc-700 hover:bg-[#C46E88] text-white rounded-lg transition-all duration-300 text-sm font-medium hover:scale-105 active:scale-95"
          >
            Add Product
          </button>
        </div>

        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 border-t-4 border-[#EEA8B3] group hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white group-hover:text-[#EEA8B3] transition-colors">Process Orders</h3>
            <div className="p-3 bg-zinc-700 rounded-full group-hover:bg-[#EEA8B3] transition-colors">
              <i className="ri-shopping-cart-line text-2xl text-[#EEA8B3] group-hover:text-white"></i>
            </div>
          </div>
          <p className="text-zinc-400 text-sm">View ,Process and Update pending orders</p>
          <button 
            onClick={() => navigate('/orders')}
            className="mt-4 w-full py-2 bg-zinc-700 hover:bg-[#EEA8B3] text-white rounded-lg transition-all duration-300 text-sm font-medium hover:scale-105 active:scale-95"
          >
            View Orders
          </button>
        </div>

        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 border-t-4 border-[#C46E88] group hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white group-hover:text-[#C46E88] transition-all">Generate Report</h3>
            <div className="p-3 bg-zinc-700 rounded-full group-hover:bg-[#C46E88] transition-colors">
              <i className="ri-file-chart-line text-2xl text-[#C46E88] group-hover:text-white"></i>
            </div>
          </div>
          <p className="text-zinc-400 text-sm">Create detailed sales and inventory reports</p>
          <button 
            onClick={() => navigate('/reports')}
            className="mt-4 w-full py-2 bg-zinc-700 hover:bg-[#C46E88] text-white rounded-lg transition-all duration-300 text-sm font-medium hover:scale-105 active:scale-95"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Inventory Status */}
      <div className="bg-zinc-800 rounded-lg shadow-md p-6 w-full ">
        <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
          <i className="ri-alert-line text-[#EEA8B3]"></i>
          Low Stock Alert
        </h2>
        <div className="space-y-4">
          <div className="flex sm:flex-row flex-col sm:gap-0 gap-5 items-center justify-between p-4 bg-zinc-700 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-600 rounded-lg flex items-center justify-center">
                <i className="ri-t-shirt-line text-2xl text-[#EEA8B3]"></i>
              </div>
              <div>
                <h3 className="text-zinc-200 font-medium">Black T-Shirt</h3>
                <p className="text-zinc-400 text-sm">Only 5 items left</p>
              </div>
            </div>
            <button className="px-4 py-2  sm:w-fit w-full bg-[#C46E88] text-white rounded-lg hover:bg-[#EEA8B3] transition-colors hover:scale-105 active:scale-95">
              Restock
            </button>
          </div>
          <div className="flex sm:flex-row flex-col sm:gap-0 gap-5 items-center justify-between p-4 bg-zinc-700 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-600 rounded-lg flex items-center justify-center">
                <i className="ri-shirt-line text-2xl text-[#C46E88]"></i>
              </div>
              <div>
                <h3 className="text-zinc-200 font-medium">Blue Jeans</h3>
                <p className="text-zinc-400 text-sm">Only 3 items left</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#C46E88] sm:w-fit w-full text-white rounded-lg hover:bg-[#EEA8B3] transition-colors hover:scale-105 active:scale-95">
              Restock
            </button>
          </div>
        </div>
      </div>

      
    </div>
    )
}

export default Dashboard
