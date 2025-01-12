import React, { useEffect } from 'react'
import { motion } from 'framer-motion'



const Marquee = () => {


  return (
    <>
    <div  className="w-full overflow-hidden bg-zinc-900/50 py-10 relative mb-20 ">
      {/* Left blur gradient */}
      <div className="absolute left-0 top-0 sm:w-32 w-10  h-full bg-gradient-to-r from-zinc-600 to-transparent  z-10"></div>

      {/* Right blur gradient */}
      <div className="absolute right-0 top-0 sm:w-32 w-10  h-full bg-gradient-to-l from-zinc-600 to-transparent z-10"></div>
      
      <div className="whitespace-nowrap flex items-center marquee gap-8 text-2xl">
        <div className="flex items-center gap-8">
          <span className="text-[#C46E88]">
            <i className="ri-truck-line mr-2"></i>Free Shipping Worldwide
          </span>
          <span className="text-white/50">|</span>
          <span className="text-[#C46E88]">
            <i className="ri-headphone-line mr-2"></i>24/7 Customer Support
          </span>
          <span className="text-white/50">|</span>
          <span className="text-[#C46E88]">
            <i className="ri-recycle-line mr-2"></i>30 Days Return Policy
          </span>
          <span className="text-white/50">|</span>
          <span className="text-[#C46E88]">
            <i className="ri-shield-check-line mr-2"></i>100% Secure Checkout
          </span>
          <span className="text-white/50">|</span>
          <span className="text-[#C46E88]">
            <i className="ri-calendar-line mr-2"></i>New Collections Weekly
          </span>
          <span className="text-white/50">|</span>
          <span className="text-[#C46E88]">
            <i className="ri-gift-line mr-2"></i>Special Offers
          </span>
          <span className="text-white/50">|</span>
        </div>
        
        {/* Duplicate for seamless loop */}
        <div className="flex items-center gap-8">
          <span className="text-[#C46E88]">
            <i className="ri-truck-line mr-2"></i>Free Shipping Worldwide
          </span>
          <span className="text-white/50">|</span>
          <span className="text-[#C46E88]">
            <i className="ri-headphone-line mr-2"></i>24/7 Customer Support
          </span>
          <span className="text-white/50">|</span>
          <span className="text-[#C46E88]">
            <i className="ri-recycle-line mr-2"></i>30 Days Return Policy
          </span>
          <span className="text-white/50">|</span>
          <span className="text-[#C46E88]">
            <i className="ri-shield-check-line mr-2"></i>100% Secure Checkout
          </span>
          <span className="text-white/50">|</span>
          <span className="text-[#C46E88]">
            <i className="ri-calendar-line mr-2"></i>New Collections Weekly
          </span>
          <span className="text-white/50">|</span>
          <span className="text-[#C46E88]">
            <i className="ri-gift-line mr-2"></i>Special Offers
          </span>
          <span className="text-white/50">|</span>
        </div>
      </div>
    </div>

    <style jsx>{`
      .marquee {
        animation: marquee 30s linear infinite;
      }

      @keyframes marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-210%); }
      }
    `}</style>

    </>
  )
}

export default Marquee
