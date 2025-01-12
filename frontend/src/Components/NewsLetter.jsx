import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useContext } from 'react';
import { ShopContext } from '../Context/Context';

const NewsLetter = () => {

  const [email, setEmail] = useState('');
  
   const { token , backendUrl, isSubscribed,setisSubscribed} = useContext(ShopContext)

  
   const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        const res = await axios.post(backendUrl + '/api/user/updateSubscription',{isSubscribed:true}, {
          headers: {
            token: token
          }
        });
        if (res.data.success) {
         toast.success("Thanks For Subscribe Us", {style: {
                  backgroundColor: 'rgb(39 39 42 / 0.8)',
                  color: 'white',
                  fontSize: '16px',
                }})
                toast.success("You Get 20% Off Now!", {style: {
                  backgroundColor: 'rgb(39 39 42 / 0.8)',
                  color: 'white',
                  fontSize: '16px',
                }})       
          setisSubscribed(true);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Use Logged in Email");
      }
      setEmail('');
    } else {
      toast.error('Please enter a valid email address.');
    }
  };



  return (
    <div className='border-2 border-[#EEA8B3] lg:h-[40vh] h-[50vh] flex flex-col justify-center  items-center gap-6 text-center rounded-2xl my-20 bg-gradient-to-br from-[#C46E88]/25 to-transparent  backdrop-blur-sm shadow-2xl  hover:scale-[1.02] transition-all duration-500'>
    
      <h1 className='lg:text-[3vw] text-[8.4vw] text-zinc-950 relative leading-10'>
        Subscribe now & get 20% off
        <span className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#EEA8B3] to-transparent'></span>
      </h1>
      

      <p className='sm:text-md text-[#EEA8B3]/90 sm:w-1/2 w-[90%]'>Join our newsletter and unlock exclusive deals, early access to new collections, and style inspiration delivered straight to your inbox.</p>

      <form onSubmit={handleSubmit} className='flex lg:flex-row flex-col lg:gap-0 gap-3  max-w-md'>
        <input 
          type='email' 
          placeholder='your@email.com' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          

          className='w-full text-white outline-none bg-transparent border-2 p-3 border-[#EEA8B3] placeholder:text-[#EEA8B3]/50 sm:rounded-l-lg focus:border-[#C46E88] transition-all duration-300'
          required 
        />
        <button type='submit' 
          className='px-6 py-3 bg-gradient-to-r from-[#C46E88] to-[#EEA8B3] sm:rounded-r-lg  '>
          Subscribe
        </button>
      </form>
     
    </div>
  )
}

export default NewsLetter
