import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from './Pages/Add'
import List from './Pages/List'
import Orders from './Pages/Orders'
import LogIn from './Components/Login'
import Dashboard from './Pages/Dashboard'
import Users from './Pages/Users' 
import Report from './Pages/Report'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect,useRef } from 'react';
import Setting from './Pages/Setting';
import Cursor from './Components/Cursor'



import { NavLink } from 'react-router-dom';
import logo from '../src/Assets/clothix_Logo.png'

import { motion, AnimatePresence } from 'framer-motion';

export const backendUrl = process.env.REACT_APP_BACKEND_URL

const App = () => {


  
  const [isOpen,setIsOpen] = useState(false)
  const [token,setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "")

  useEffect(() => {
    localStorage.setItem("token",token)
  },[token])

 

  return (
    
      
    <div  className=' w-full h-screen bg-zinc-600 overflow-hidden'>
      <Cursor></Cursor>
     
      <ToastContainer/>
      {token===""?
      <LogIn setToken={setToken}/>
      :<>
      <div className='flex w-full'>
        {/** WELCOME MSG */}
        <div className="absolute top-4  right-8 text-white flex items-center gap-2">
          <i className="ri-user-smile-line text-2xl text-[#EEA8B3]"></i>
          <span className="text-lg">Welcome, Admin!</span>
        </div>
        {/**  SIDEBAR */}
        <div className={`h-screen bg-zinc-800 text-white p-5 transition-all z-40  duration-300 ${isOpen ? 'sm:w-[25vw] w-[100vw]' : 'sm:w-[8vw] w-[15vw]'}`}>
      <div className={`flex flex-col gap-2 ${isOpen ? 'items-start' : 'items-center'}`}>

        <div className="flex items-center mb-3">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl hover:text-[#EEA8B3] transition-all group relative">
          {isOpen?<i class="ri-close-large-line"></i>:<i class="ri-menu-line"></i>}
           {!isOpen && <span className="absolute left-full ml-2 p-2 bg-zinc-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Toggle Menu
            </span>} 
          </button>
          {isOpen && <div className=' pl-2 flex'>
          <img className='sm:w-[2.4vw] w-[8vw] mr-1 object-contain' src={logo}/>
          <h1 className="text-2xl font-bold text-nowrap  text-[#C46E88] leading-7">Clothix</h1>
          </div>
          }
        </div>

        <NavLink 
          to="/"
          onClick={() => setIsOpen(false)}
          className={({isActive}) => 
            `p-3 rounded-lg transition-all duration-300 flex items-center gap-3 group relative
            ${isActive ? 'bg-zinc-700 text-[#EEA8B3]' : ''} ${isOpen ? 'w-full' : ''}`
          }
        >
          <i className="ri-dashboard-line"></i>
          {isOpen && "Dashboard"}
          {!isOpen && <span className="absolute left-full ml-2 p-2 bg-zinc-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Dashboard</span>}
        </NavLink>

        <NavLink
          to="/add"
          onClick={() => setIsOpen(false)}
          className={({isActive}) =>
            `p-3 rounded-lg transition-all duration-300 flex items-center gap-3 group relative
            ${isActive ? 'bg-zinc-700 text-[#EEA8B3]' : ''} ${isOpen ? 'w-full' : ''}`
          }
        >
          <i className="ri-add-line"></i>
          {isOpen && <span className='text-nowrap'>Add Product</span>}
          {!isOpen && <span className="absolute left-full ml-2 p-2 bg-zinc-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity  text-nowrap">Add Product</span>}
        </NavLink>

        <NavLink
          to="/products" 
          onClick={() => setIsOpen(false)}
          className={({isActive}) =>
            `p-3 rounded-lg transition-all duration-300 flex items-center gap-3 group relative
            ${isActive ? 'bg-zinc-700 text-[#EEA8B3]' : ''} ${isOpen ? 'w-full' : ''}`
          }
        >
          <i className="ri-shopping-bag-line"></i>
          {isOpen && "Products"}
          {!isOpen && <span className="absolute left-full ml-2 p-2 bg-zinc-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Products</span>}
        </NavLink>

        <NavLink
          to="/reports"
          onClick={() => setIsOpen(false)}
          className={({isActive}) =>
            `p-3 rounded-lg transition-all duration-300 flex items-center gap-3 group relative
            ${isActive ? 'bg-zinc-700 text-[#EEA8B3]' : ''} ${isOpen ? 'w-full' : ''}`
          }
        >
          <i className="ri-file-chart-line"></i>
          {isOpen && "Reports"}
          {!isOpen && <span className="absolute left-full ml-2 p-2 bg-zinc-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Reports</span>}
        </NavLink>

        <NavLink
          to="/orders"
          onClick={() => setIsOpen(false)}
          className={({isActive}) =>
            `p-3 rounded-lg transition-all duration-300 flex items-center gap-3 group relative
            ${isActive ? 'bg-zinc-700 text-[#EEA8B3]' : ''} ${isOpen ? 'w-full' : ''}`
          }
        >
          <i className="ri-shopping-cart-line"></i>
          {isOpen && "Orders"}
          {!isOpen && <span className="absolute left-full ml-2 p-2 bg-zinc-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Orders</span>}
        </NavLink>

        <NavLink
          to="/users"
          onClick={() => setIsOpen(false)}
          className={({isActive}) =>
            `p-3 rounded-lg transition-all duration-300 flex items-center gap-3 group relative
            ${isActive ? 'bg-zinc-700 text-[#EEA8B3]' : ''} ${isOpen ? 'w-full' : ''}`
          }
        >
          <i className="ri-user-line"></i>
          {isOpen && "Users"}
          {!isOpen && <span className="absolute left-full ml-2 p-2 bg-zinc-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Users</span>}
        </NavLink>

        <NavLink
          to="/settings"
          onClick={() => setIsOpen(false)}
          className={({isActive}) =>
            `p-3 rounded-lg transition-all duration-300 flex items-center gap-3 group relative
            ${isActive ? 'bg-zinc-700 text-[#EEA8B3]' : ''} ${isOpen ? 'w-full' : ''}`
          }
        >
          <i className="ri-settings-line"></i>
          {isOpen && "Settings"}
          {!isOpen && <span className="absolute left-full ml-2 p-2 bg-zinc-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Settings</span>}
        </NavLink>

        <button onClick={()=>setToken("")} className={`${isOpen ? 'w-full' : ''} mt-auto p-3 bg-[#C46E88] hover:bg-[#EEA8B3] transition-all duration-300 rounded-lg flex items-center gap-3 group relative`}>
          <i className="ri-logout-box-line"></i>
          
          {isOpen && "Logout"}
          {!isOpen && <span className="absolute left-full ml-2 p-2 bg-zinc-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Logout</span>}
        </button>
        
      </div>
    </div>


    {/**MAIN CONTENT */}
        <div  className={` ${isOpen?'w-0 sm:w-full':'w-full'} flex h-screen bg-zinc-700 overflow-y-scroll scroller`}>
          <AnimatePresence mode='wait'>
            <Routes>
              <Route path='/add' element={
                <motion.div
                  key="add"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: .5 }}
                  className='w-full'
                >
                  <Add token={token}/>
                </motion.div>
              } />
              <Route path='/products' element={
                <motion.div
                  key="products" 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: .5 }}
                  className='w-full'
                >
                  <List token={token}/>
                </motion.div>
              } />
              <Route path='/orders' element={
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: .5 }}
                  className='w-full'
                >
                  <Orders token={token}/>
                </motion.div>
              } />
              <Route data-scroll data-scroll-speed="-4"  path='/' element={
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: .5 }}
                  className='w-full'
                >
                  <Dashboard token={token}/>
                </motion.div>
              } />
              <Route path='/users' element={
                <motion.div
                  key="users"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: .5 }}
                  className='w-full'
                >
                  <Users token={token}/>
                </motion.div>
              } />
              <Route path='/reports' element={
                <motion.div
                  key="reports"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: .5 }}
                  className='w-full'
                >
                  <Report token={token}/>
                </motion.div>
              } />
              <Route path='/settings' element={
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: .5 }}
                  className='w-full'
                >
                  <Setting token={token}/>
                </motion.div>
              } />
              
            </Routes>
          
          </AnimatePresence>
      
        </div>
      </div>
      </>}
    </div>
   
  )
}

export default App
