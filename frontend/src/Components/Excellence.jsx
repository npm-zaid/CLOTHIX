import React from 'react'
import Title2 from './Title2'
import { NavLink } from 'react-router-dom'

const Excellence = () => {
  return (
  
    <div className="my-20 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-8 rounded-2xl shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#C46E88]/0 via-[#C46E88]/15 to-[#C46E88]/0 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
      
      <div className="text-center max-w-4xl mx-auto relative">
        {/* TITLE */}
        <Title2 text='Our Commitment to Excellence'></Title2>

        {/* DESCRIPTION */}
        <p className="text-zinc-400 leading-relaxed text-lg mb-12 text-start">
          At FOREVER, we believe in creating more than just fashion - we craft experiences. Our dedication to quality, sustainability, and innovative design drives everything we do. Join us in redefining the future of fashion.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-900/50 p-6 rounded-xl border-2 border-white/5 hover:border-[#C46E88]/30 transition-colors duration-300 group/stat">
            <div className="text-4xl font-bold text-[#C46E88] mb-2 group-hover/stat:scale-110 transition-transform duration-300">15+</div>
            <div className="text-white/80">Years of Excellence</div>
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-xl border-2 border-white/5 hover:border-[#C46E88]/30 transition-colors duration-300 group/stat">
            <div className="text-4xl font-bold text-[#C46E88] mb-2 group-hover/stat:scale-110 transition-transform duration-300">50k+</div>
            <div className="text-white/80">Happy Customers</div>
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-xl border-2 border-white/5 hover:border-[#C46E88]/30 transition-colors duration-300 group/stat">
            <div className="text-4xl font-bold text-[#C46E88] mb-2 group-hover/stat:scale-110 transition-transform duration-300">100%</div>
            <div className="text-white/80">Quality Assured</div>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-6">
          <NavLink to='/about' className="px-8 py-3 bg-gradient-to-r from-[#C46E88] to-[#EEA8B3] rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-[#C46E88]/30 transition-all duration-300 hover:-translate-y-1">
            Join <span className='sm:inline hidden'>Our Journey</span>
          </NavLink>
          <NavLink to='/about' className="px-8 py-3 border border-[#C46E88] rounded-lg text-[#C46E88] font-semibold hover:bg-[#C46E88] hover:text-white transition-all duration-300 hover:-translate-y-1">
            Learn More
          </NavLink>
        </div>
      </div>
    </div>
 

  )
}

export default Excellence