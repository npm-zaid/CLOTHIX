import React from 'react'
import { assets } from '../Assets/assets'
import { NavLink } from 'react-router-dom'




const Hero = () => {
  return (
    
    <div data-scroll data-scroll-speed="-2"  className='h-screen w-full flex items-center'>
        <div className='grid sm:grid-cols-2  sm:h-[65%] h-[75%] w-full sm:gap-2 gap-0 rounded-2xl border-2 border-[#C46E88]'>
            
             {/* left */}
            <div className='sm:order-1 order-2 flex items-center justify-center   '>
                <div className='p-4'>
                    <p className='text-sm'>winter/summer collection-2025</p>
                    <div className='mb-5 mt-2'>
                    <h1 className='sm:text-[3vw] text-[8vw] leading-5 tracking-tighter'>get up to 30% off</h1>
                    <h1 className='sm:text-[3vw] text-[8vw] tracking-tighter bg-gradient-to-r from-[#C46E88]  to-[#EEA8B3] animate-gradient bg-[length:200%] bg-clip-text text-transparent'>new arrivals</h1>
                    </div>
                    <NavLink to='/collection' className='bg-[#c46e88] hover:bg-[#EEA8B3] transition-all duration-300 text-white px-8 py-4 rounded-lg font-medium  hover:scale-110 shadow-lg'>
                        Shop Now
                    </NavLink>
                </div>
            </div>

             {/* right */}
            <div className=' sm:order-2 order-1  h-full  group overflow-hidden rounded-xl sm:shadow-none shadow-2xl'>
            <img   className='h-full w-full object-cover transform transition-all hover:scale-[1.1] duration-500'  src={assets.pic}></img>
            </div>

        </div>
        
    </div>
  )
}

export default Hero
