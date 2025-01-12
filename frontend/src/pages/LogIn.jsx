import React, { useState,useContext,useEffect } from 'react'
import { ShopContext } from '../Context/Context'
import axios from 'axios'
import { toast } from 'react-toastify'
import Title from '../Components/Title'




const LogIn = () => {
  
const {settoken,backendUrl,token,navigate}=useContext(ShopContext)

  const [status,setstatus]=useState('LogIn')
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const [username,setusername]=useState('')
  

  const handleSubmit= async(e)=>{
    e.preventDefault()
  
  try {
    
    if(status==='SignUp'){
      const response = await axios.post(backendUrl + '/api/user/register',{username,email,password})
      if(response.data.success){
        toast.success(response.data.message, {style: {
          backgroundColor: 'rgb(39 39 42 / 0.8)',
          color: 'white',
          fontSize: '16px',
        }})
        settoken(response.data.token)
        localStorage.setItem('token',response.data.token)
    
      }
      else{
        toast.error(response.data.message)
      }
     
    }
    else{
      const response = await axios.post(backendUrl + '/api/user/login',{email,password})
      console.log(response)
      if(response.data.success){
        toast.success(response.data.message, {style: {
          backgroundColor: 'rgb(39 39 42 / 0.8)',
          color: 'white',
          fontSize: '16px',
        }})
        settoken(response.data.token)
        localStorage.setItem('token',response.data.token)
      }
      else{
      toast.error(response.data.message, {
        style: {
          backgroundColor: 'rgb(39 39 42 / 0.8)',
          color: 'white',
          fontSize: '16px',
        },draggable: true
      })
      }
      
    }

   } catch (error) {
    toast.error(error.response.data.message)
   }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);
  return (
    <div className='h-[110vh] sm:p-10  flex items-center justify-center  '>
      <form onSubmit={handleSubmit} className='w-full sm:w-[450px] p-8 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/60 border border-[#C46E88]/20 hover:border-[#C46E88]/40 shadow-xl backdrop-blur-lg'>
        <div className='text-center mb-8'>
         <Title text1={status} text2= {<i className="ri-user-heart-line"></i>} />
          <p className='text-zinc-400 mt-2'>Welcome to Forever</p>
        </div>

        <div className='space-y-4'>
          {status === 'LogIn' ? '' : 
            <div className='relative'>
              <i className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-[#C46E88]"></i>
              <input 
                className='w-full pl-12 pr-4 outline-none py-3 bg-zinc-800/50 border border-[#C46E88]/20 focus:border-[#C46E88] rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#C46E88]/50 transition-all duration-300'
                onChange={(e)=>setusername(e.target.value)}
                type="text"
                placeholder='Username'
              />
            </div>
          }

          <div className='relative'>
            <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-[#C46E88]"></i>
            <input 
              className='w-full pl-12 pr-4 outline-none py-3 bg-zinc-800/50 border border-[#C46E88]/20 focus:border-[#C46E88] rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#C46E88]/50 transition-all duration-300'
              onChange={(e)=>setemail(e.target.value)}
              type="email"
              required
              placeholder='Email'
            />
          </div>

          <div className='relative'>
            <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-[#C46E88]"></i>
            <input 
              className='w-full pl-12 pr-4 outline-none py-3 bg-zinc-800/50 border border-[#C46E88]/20 focus:border-[#C46E88] rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#C46E88]/50 transition-all duration-300'
              onChange={(e)=>setpassword(e.target.value)}
              type="password"
              required
              placeholder='Password'
            />
          </div>
        </div>

        <div className='flex justify-between items-center mt-6 text-sm'>
          <p className='text-zinc-400 hover:text-[#EEA8B3] cursor-pointer transition-colors duration-300'>Forgot password?</p>
          {status==='LogIn' ? 
            <p className='text-[#EEA8B3] hover:text-white cursor-pointer transition-colors duration-300' onClick={()=>setstatus("SignUp")}>Create account</p>
            :
            <p className='text-[#EEA8B3] hover:text-white cursor-pointer transition-colors duration-300' onClick={()=>setstatus("LogIn")}>Login instead</p>
          }
        </div>

        <button className='w-full mt-8 py-3 px-6 bg-gradient-to-r from-[#C46E88] to-[#EEA8B3] hover:from-[#EEA8B3] hover:to-[#C46E88] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2'>
          <i className="ri-login-circle-line"></i>
          {status}
        </button>
      </form>
    </div>
  )
}

export default LogIn
