import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const LogIn = ({setToken}) => {

  
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const handleSubmit= async (e) =>{
      try{
        e.preventDefault();
        const response = await axios.post(backendUrl + "/api/user/admin",{email,password})
        if(response.data.success){
          setToken(response.data.token)
          console.log(response.data.token)
        }
        else{
          toast.error(
            <div style={{ backgroundColor: 'red', color: '#fff' }}>
                {response.data.message}
            </div>,
            // Optional: You can still adjust other options here
        );
        }
      }
       catch(error){
        console.log(error)
        toast.error("Something went wrong")
       }
    }
    
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 '>
      <div className='sm:w-[400px] w-[90%] bg-zinc-800/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-zinc-800'>
        <div className='bg-gradient-to-r from-[#C46E88] to-[#EEA8B3] p-4'>
          <div className='flex flex-col items-center gap-3'>
            <div className='w-16 h-16 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center'>
              <i className="ri-shield-keyhole-line text-3xl text-white"></i>
            </div>
            <h1 className='text-3xl font-bold text-white text-center'>
              Admin Panel
            </h1>
            <p className='text-white/70 text-sm'>Sign in to access dashboard</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className='p-8 flex flex-col gap-6'>
          <div className='space-y-2'>
            <label className='text-zinc-400 text-sm flex items-center gap-2'>
              <i className="ri-mail-line text-[#EEA8B3]"></i>
              Email Address
            </label>
            <div className='relative group'>
              <input 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
                className='w-full bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#C46E88] focus:border-transparent transition-all placeholder:text-zinc-500'
                type="email" 
                required 
                placeholder='Enter your email'
              />
              <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-[#C46E88]/20 to-[#EEA8B3]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'></div>
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-zinc-400 text-sm flex items-center gap-2'>
              <i className="ri-lock-line text-[#EEA8B3]"></i>
              Password
            </label>
            <div className='relative group'>
              <input 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)} 
                className='w-full bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#C46E88] focus:border-transparent transition-all placeholder:text-zinc-500'
                type="password" 
                required 
                placeholder='Enter your password'
              />
              <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-[#C46E88]/20 to-[#EEA8B3]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'></div>
            </div>
          </div>

          <button className='relative w-full py-3 rounded-lg bg-gradient-to-r from-[#C46E88] to-[#EEA8B3] text-white font-medium overflow-hidden group'>
            <div className='absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform'></div>
            <span className='relative flex items-center justify-center gap-2'>
              <i className="ri-login-circle-line"></i>
              Sign In
            </span>
          </button>

          <p className='text-center text-zinc-500 text-sm'>
            Protected by advanced security protocols
            <i className="ri-shield-check-line ml-2 text-[#EEA8B3]"></i>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LogIn

/*

*/