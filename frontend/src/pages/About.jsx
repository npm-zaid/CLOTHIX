import React from 'react'
import AboutContent from '../Components/AboutContent'
import { useEffect } from 'react';


const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);
  
  
  return (
    
    <div className='pt-[10vh] '>
      <AboutContent/>
        
    </div>
  )
}

export default About

/*
 <div className="fixed inset-0 bg-zinc-900 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#C46E88] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 border-4 border-[#EEA8B3] border-b-transparent rounded-full animate-spin-reverse"></div>
          </div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="w-4 h-4 bg-[#C46E88] rounded-full animate-bounce shadow-lg shadow-[#C46E88]/50"></div>
          </div>
        </div>
      </div>
*/