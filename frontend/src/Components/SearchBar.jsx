import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../Context/Context'
import { motion } from 'framer-motion';

const SearchBar = () => {

    const { search, setsearch, showsearch, setshowsearch, setsend } = useContext(ShopContext)
    const func = () => {
      setshowsearch(false)
    }

  return showsearch ? (
    <motion.div 
        className='p-4 border-2 border-[#c46e88] rounded-2xl flex justify-center items-center gap-3 hover:shadow-[0_0_15px_rgba(196,110,136,0.3)] transition-all duration-500 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 backdrop-blur-md'
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.7, ease: "easeInOut" }} // Added smooth exit animation
    >
        <div className='flex bg-zinc-700/30 backdrop-blur-lg rounded-xl items-center px-6 w-full group hover:bg-zinc-600/40 transition-all duration-500 border border-[#EEA8B3]/20'>
            <i className="ri-search-line text-[#EEA8B3] text-xl mr-3 transition-all duration-300"></i>
            <input 
                onClick={() => setsend(false)}  
                value={search} 
                onChange={(e) => setsearch(e.target.value)} 
                placeholder='Discover products...' 
                className='bg-transparent py-4 w-full  text-gray-200 placeholder:text-[#EEA8B3]/60 outline-none focus:placeholder:text-[#EEA8B3] transition-all tracking-wide'
            />

            <div className='flex items-center gap-3'>
                <i 
                    onClick={() => setsend(true)} 
                    className="text-[#EEA8B3] transform hover:translate-x-1 hover:scale-110  ri-send-plane-2-line text-xl cursor-pointer transition-all duration-300"
                ></i>
                <div className='h-6 w-[1px] bg-[#EEA8B3]/20'></div>
                <i 
                    onClick={func} 
                    className="text-2xl bg-gradient-to-r from-[#C46E88] to-[#EEA8B3] hover:rotate-90 bg-clip-text text-transparent hover:scale-125 ri-close-circle-fill cursor-pointer transition-all duration-500"
                ></i>
            </div>
          
        </div>
    </motion.div>
  ) : null
}

export default SearchBar
