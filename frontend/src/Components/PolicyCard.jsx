import React from 'react'

const PolicyCard = ({icon, title, description, borderColor,speed}) => {
  return (
    <div data-scroll data-scroll-speed={speed}  className={`group bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur p-6 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 ease-in-out border-l-4`} style={{ borderColor: borderColor || '#EEA8B3' }}>
      <div className='flex flex-col items-center'>  
        <div className='bg-gradient-to-br from-[#C46E88]/20 to-transparent p-4 rounded-full w-fit mb-4'>
          <i 
            className={`${icon} text-[#EEA8B3] text-4xl md:text-5xl`}
          ></i>
        </div>
        <h2 className='text-white font-bold text-2xl group-hover:text-[#EEA8B3] transition-colors duration-300'>{title}</h2>
        <p className='text-zinc-400 text-sm leading-relaxed text-center'>{description}</p>
      </div>
    </div>
  )
}

export default PolicyCard
