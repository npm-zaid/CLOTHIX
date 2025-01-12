import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const Users = ({token}) => {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const res = await axios.post(backendUrl + '/api/user/allusers')
      if (res.data.success) {
        setUsers(res.data.users)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="font w-full  px-8 py-16">
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <i className="ri-team-line text-[#EEA8B3]"></i>
        All Users({users.length})
      </h1>

      <div className="flex flex-col gap-4  pb-5">
        <div className="hidden md:grid grid-cols-[2fr_2fr_2fr_2fr_2fr] bg-zinc-800 p-4 rounded-lg border-l-4 border-[#C46E88] shadow-md">
          <b className="text-gray-300 flex items-center gap-2">
            <i className="ri-fingerprint-line text-[#EEA8B3]"></i>
            User ID
          </b>
          <b className="text-gray-300 flex items-center gap-2">
            <i className="ri-user-smile-line text-[#EEA8B3]"></i>
            Name
          </b>
          <b className="text-gray-300 flex items-center gap-2">
            <i className="ri-mail-line text-[#EEA8B3]"></i>
            Email
          </b>
          <b className="text-gray-300 flex items-center gap-2">
            <i className="ri-shield-user-line text-[#EEA8B3]"></i>
            Subscriber
          </b>
          <b className="text-gray-300 flex items-center gap-2">
            <i className="ri-calendar-line text-[#EEA8B3]"></i>
            Joined Date
          </b>
        </div>

        {users.reverse().map((user, index) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="sm:grid grid-cols-[2fr_2fr_2fr_2fr_2fr] bg-zinc-800/90 p-4 rounded-lg shadow-md hover:shadow-xl hover:bg-zinc-800 transition-all duration-300 border-l-2 border-transparent hover:border-[#EEA8B3]"
          >
            <motion.div 
              className="text-[#EEA8B3] font-medium flex items-center gap-2"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <i className="ri-fingerprint-line"></i>
              #{user._id.slice(-6)}
            </motion.div>
            
            <motion.div 
              className="text-gray-200 font-medium flex items-center gap-2"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <i className="ri-user-smile-line text-[#EEA8B3]"></i>
              {user.username}
            </motion.div>
            
            <motion.div 
              className="text-gray-400 flex items-center gap-2"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <i className="ri-mail-line text-[#EEA8B3]"></i>
              {user.email}
            </motion.div>
            
            <motion.div 
              className="flex items-center sm:pl-8 sm:gap-0 gap-4"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <i className="sm:hidden inline-block text-[#EEA8B3] ri-honour-line"></i>
               <span className={`text-sm px-2 py-1 rounded-full flex items-center gap-1 animate-pulse
                      ${user.subscriber ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}>
                      <i className={` sm:text-2xl text-lg ${user.subscriber ? "ri-checkbox-circle-line" : "ri-close-circle-line"}`}></i>

                    </span>
            </motion.div>

            <motion.div 
              className="text-gray-400 flex items-center gap-2"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <i className="ri-calendar-line text-[#EEA8B3]"></i>
              {new Date(user.registrationDate).toLocaleDateString()}
            </motion.div>

          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Users
