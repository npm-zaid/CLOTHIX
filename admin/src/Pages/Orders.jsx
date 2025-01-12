import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const Orders = ({token}) => {

  const [orderData,setOrderData]=useState([])

  const FetchOrderData=async()=>{
    if(!token){
      return null
    }
    try{
      const response=await axios.post(backendUrl + '/api/order/list',{},{headers:{token}})
      console.log(response.data)
      if(response.data.success){
        setOrderData((response.data.orders).reverse())
      }
      else{
        toast.error(response.data.message)
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    FetchOrderData()
  },[token])


  

  //update order status 
  const UpdateOrderStatus=async(orderId,e)=>{
    try{
      const response=await axios.post(backendUrl + '/api/order/status',{orderId,status:e.target.value},{headers:{token}})
      if(response.data.success){
        await FetchOrderData()
      }
      else{
        toast.error(response.data.message)
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
   
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='font w-full  px-8 py-16'
      >
          <div className="flex justify-between items-center mb-8">
            <motion.h1 
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl font-bold text-white flex items-center gap-3"
            >
              <i className="ri-shopping-cart-line text-[#EEA8B3]"></i>
              All Orders
              <span className="ml-3 sm:text-lg text-sm text-nowrap  bg-[#EEA8B3]/10 text-[#EEA8B3] px-3 py-1 rounded-full">
                {orderData.length} <span className='hidden sm:inline'>Orders</span>
              </span>
            </motion.h1>
          </div>
        
        <div className='flex flex-col gap-4 pb-5'>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className='hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_2fr] bg-zinc-800 p-4 rounded-lg border-l-4 border-[#C46E88] shadow-md'
          >
            <b className="text-gray-300 flex items-center gap-2">
              <i className="ri-user-3-line text-[#EEA8B3]"></i>
              Customer Details
            </b>
            <b className="text-gray-300 flex items-center gap-2">
              <i className="ri-shopping-bag-line text-[#EEA8B3]"></i>
              Products
            </b>
            <b className="text-gray-300 flex items-center gap-2 justify-center">
              <i className="ri-money-rupee-circle-line text-[#EEA8B3]"></i>
              Total Amount
            </b>
            <b className="text-gray-300 flex items-center gap-2 justify-center">
              <i className="ri-bank-card-line text-[#EEA8B3]"></i>
              Payment
            </b>
            <b className="text-gray-300 flex items-center gap-2 justify-center">
              <i className="ri-truck-line text-[#EEA8B3]"></i>
              Status
            </b>
          </motion.div>

          {orderData.map((order,index)=>(
           

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  key={index} 
                  className='md:grid grid-cols-[2fr_1fr_1fr_1fr_2fr]  bg-zinc-800/90 p-4 rounded-lg shadow-md hover:shadow-xl hover:bg-zinc-800 transition-all duration-300 items-center border-l-2 border-transparent hover:border-[#EEA8B3]'
                >
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className='flex gap-3 items-center'
                  >
                    <div className='w-12 h-12 bg-zinc-700 rounded-full flex items-center justify-center text-[#EEA8B3] shadow-md'>
                      <i className="ri-user-smile-line text-xl"></i>
                    </div>
                    <div className='space-y-1'>
                      <p className='font-semibold text-[#EEA8B3]'>{order.address.name}</p>
                      <p className='text-sm text-gray-400 flex items-center gap-1'>
                        <i className="ri-mail-line"></i>
                        {order.address.email}
                      </p>
                      <p className='text-sm text-gray-400 flex items-center gap-1'>
                        <i className="ri-phone-line"></i>
                        {order.address.phone}
                      </p>
                      <p className='text-sm text-gray-400 flex items-center gap-1'>
                        <i className="ri-calendar-line"></i>
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className='flex items-center sm:my-0 my-3 gap-2 overflow-x-scroll scroller'
                  >
                     <div className='w-10 h-10 bg-zinc-700 rounded-lg flex items-center justify-center text-[#EEA8B3]'>
                      <i className="ri-shopping-bag-3-line"></i>
                    </div>
                   {
                    order.items.map((item)=>(
                    
                                          
                    <div className='ml-5'>
                      <p className='font-medium text-gray-300'>{item.name}</p>
                      <p className='text-[#EEA8B3]'>Qty : {item.qty}</p>
                    </div>
                    )
                    
                    )
                   }
                  </motion.div>

                  <p className='text-center bg-zinc-900/50 sm:bg-transparent rounded-md font-semibold text-[#C46E88] text-lg'>₹{(order.amount/100).toFixed(2)}</p>
              
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className='flex sm:flex-col my-3 sm:my-0 gap-2 items-center sm:justify-start justify-center'
                  >
                    <span className='text-sm px-3 py-1 bg-zinc-700 rounded-full text-gray-300 flex items-center gap-1'>
                      <i className="ri-bank-card-line"></i>
                      {order.paymentMethod}
                    </span>
                    <span className={`text-sm px-3 py-1 rounded-full flex items-center gap-1
                      ${order.paymentStatus ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}>
                      <i className={`${order.paymentStatus ? "ri-checkbox-circle-line" : "ri-close-circle-line"}`}></i>
                      {order.paymentStatus ? "Paid" : "Unpaid"}
                    </span>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className='flex justify-center'
                  >
                    <select 
                      value={order.status} 
                      onChange={(e) => UpdateOrderStatus(order._id,e)}   
                      className={`w-full  px-4 py-3 rounded-lg outline-none transition-all duration-300 flex items-center gap-2
                        ${
                          order.status === 'processing' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-600' :
                          order.status === 'completed' ? 'bg-green-900/50 text-green-300 border border-green-600' :
                          order.status === 'cancelled' ? 'bg-red-900/50 text-red-300 border border-red-600' :
                          order.status === 'out for delivery' ? 'bg-blue-900/50 text-blue-300 border border-blue-600' :
                          order.status === 'returned' ? 'bg-purple-900/50 text-purple-300 border border-purple-600' :
                          'bg-zinc-900/50 text-zinc-300 border border-zinc-600'
                        }`}
                    >
                      <option value="processing" className="bg-orange-500">⟳ Processing</option>
                      <option value="completed" className="bg-green-500">✓ Completed</option>
                      <option value="cancelled" className="bg-red-500">✕ Cancelled</option>
                      <option value="out for delivery" className="bg-yellow-500"> Out for Delivery</option>
                      <option value="returned" className="bg-purple-500">↩ Returned</option>
                    </select>
                  </motion.div>
                </motion.div>
              
            
          ))}
        </div>
      </motion.div>
  
  )
}

export default Orders 
