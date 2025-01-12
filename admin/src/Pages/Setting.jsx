import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Setting = ({token}) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match")
      return
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    try {
      const res = await axios.post(backendUrl + '/api/admin/change-password', 
        {
          oldPassword,
          newPassword
        },
        {
          headers: { token }
        }
      )

      if (res.data.success) {
        toast.success('Password updated successfully')
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false) 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = (field) => {
    switch(field) {
      case 'old':
        setShowOldPassword(!showOldPassword)
        break
      case 'new':
        setShowNewPassword(!showNewPassword)
        break
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword)
        break
      default:
        break
    }
  }

  return (
    <div className="font w-full  px-8 py-16">
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <i className="ri-settings-line text-[#EEA8B3]"></i>
        Settings
      </h1>

      <div className="bg-zinc-800 rounded-xl shadow-lg p-8 max-w-xl">
        <h2 className="text-2xl font-bold text-[#EEA8B3] mb-6 flex items-center gap-2">
          <i className="ri-lock-password-line"></i>
          Change Password
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-300 text-lg mb-2 flex items-center gap-2">
              <i className="ri-key-line"></i>
              Current Password
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c46e88] transition-all"
                required
              />
              <i 
                onClick={() => togglePasswordVisibility('old')}
                className={`${showOldPassword ? 'ri-eye-off-line' : 'ri-eye-line'} absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#EEA8B3] transition-colors`}
              ></i>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300 text-lg mb-2 flex items-center gap-2">
              <i className="ri-key-2-line"></i>
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c46e88] transition-all"
                required
              />
              <i 
                onClick={() => togglePasswordVisibility('new')}
                className={`${showNewPassword ? 'ri-eye-off-line' : 'ri-eye-line'} absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#EEA8B3] transition-colors`}
              ></i>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300 text-lg mb-2 flex items-center gap-2">
              <i className="ri-checkbox-circle-line"></i>
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c46e88] transition-all"
                required
              />
              <i 
                onClick={() => togglePasswordVisibility('confirm')}
                className={`${showConfirmPassword ? 'ri-eye-off-line' : 'ri-eye-line'} absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#EEA8B3] transition-colors`}
              ></i>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-[#C46E88] hover:bg-[#EEA8B3] text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#EEA8B3] focus:ring-offset-2 focus:ring-offset-zinc-800 hover:shadow-lg flex items-center justify-center gap-2"
          >
            <i className="ri-save-line"></i>
            Update Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default Setting
