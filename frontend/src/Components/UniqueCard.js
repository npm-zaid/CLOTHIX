import React from 'react'

const UniqueCard = () => {
  return (
    <div className="relative w-full max-w-md mx-auto mt-8 overflow-hidden">
      <div className="relative bg-gradient-to-r from-[#c46e88] to-[#EEA8B3] p-6 rounded-tl-lg rounded-tr-lg rounded-bl-lg transform hover:scale-105 transition-all duration-300 shadow-xl">
        {/* Clip path for bottom right cut */}
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-zinc-900 transform rotate-45 translate-x-8 translate-y-8"></div>
        
        <div className="text-white">
          <h2 className="text-2xl font-bold mb-4">Special Offer</h2>
          <p className="mb-6">Get up to 30% off on selected items from our new spring collection!</p>
          <button className="bg-white text-[#c46e88] px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default UniqueCard
