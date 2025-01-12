import React from 'react'
import {assets} from '../Assets/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/60   rounded-t-3xl border-l-4 border-[#C46E88] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="grid grid-cols-12  gap-10 sm:p-8 p-4">
        
        {/* Company Info */}
        <div className='sm:col-span-4 col-span-12'>
            
            <div className='flex items-center gap-2 mb-4'>
              <img src={assets.ClothixLogo} className='sm:w-[5vw] w-[15vw] object-contain' alt="Clothix Logo" />
              <h1 className=' sm:text-3xl text-[8vw] font-bold bg-gradient-to-r from-[#C46E88] via-[#EEA8B3] to-[#EEA8B3] bg-clip-text text-transparent'>Clothix</h1>
            </div>

            <p className='text-zinc-400 leading-relaxed sm:max-w-[20vw] max-w-[83vw] text-sm'>Your premier destination for fashion and lifestyle products. We bring you the latest trends with uncompromising quality and style.</p>

           
              <div className='flex gap-4 mt-4'>
                <a href="#" className="sm:w-10 sm:h-10 w-12 h-12 rounded-full bg-[#C46E88]/20 flex items-center justify-center group hover:bg-[#C46E88] transition-all duration-300">
                  <i className="ri-facebook-fill text-[1.5rem] text-[#EEA8B3] group-hover:text-white transition-colors"></i>
                </a>
                <a href="#" className="sm:w-10 sm:h-10 w-12 h-12 rounded-full bg-[#C46E88]/20 flex items-center justify-center group hover:bg-[#C46E88] transition-all duration-300">
                  <i className="ri-twitter-fill text-[1.5rem]  text-[#EEA8B3] group-hover:text-white transition-colors"></i>
                </a>
                <a href="#" className="sm:w-10 sm:h-10 w-12 h-12 rounded-full bg-[#C46E88]/20 flex items-center justify-center group hover:bg-[#C46E88] transition-all duration-300">
                  <i className="ri-linkedin-fill text-[1.5rem]  text-[#EEA8B3] group-hover:text-white transition-colors"></i>
                </a>
                <a href="https://www.instagram.com/zaid_rehman_05" className="sm:w-10 sm:h-10 w-12 h-12 rounded-full bg-[#C46E88]/20 flex items-center justify-center group hover:bg-[#C46E88] transition-all duration-300">
                  <i className="ri-instagram-fill text-[1.5rem]  text-[#EEA8B3] group-hover:text-white transition-colors"></i>
                </a>
              </div>
          </div>

        {/* Quick Links */}
        <div className='sm:col-span-2 col-span-4'>
          <h4 className="text-xl w-fit mb-8 font-semibold text-white relative ">
            Quick Links
            <span className='absolute -bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#C46E88] via-[#EEA8B3] to-transparent'></span>
          </h4>
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink to="/" className="text-zinc-400 hover:text-[#C46E88] transition-all duration-300 hover:translate-x-2 inline-flex items-center group">
                <i className="ri-arrow-right-s-line mr-2 group-hover:rotate-90 transition-all duration-300"></i>Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="text-zinc-400 hover:text-[#C46E88] transition-all duration-300 hover:translate-x-2 inline-flex items-center group">
                <i className="ri-arrow-right-s-line mr-2 group-hover:rotate-90 transition-all duration-300"></i>About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/collection" className="text-zinc-400 hover:text-[#C46E88] transition-all duration-300 hover:translate-x-2 inline-flex items-center group">
                <i className="ri-arrow-right-s-line mr-2 group-hover:rotate-90 transition-all duration-300"></i>Collections
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="text-zinc-400 hover:text-[#C46E88] transition-all duration-300 hover:translate-x-2 inline-flex items-center group">
                <i className="ri-arrow-right-s-line mr-2 group-hover:rotate-90 transition-all duration-300"></i>Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="sm:col-span-2 col-span-6">
          <h4 className="text-xl w-fit mb-8 font-semibold text-white relative">
             Service
            <span className='absolute -bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#C46E88] via-[#EEA8B3] to-transparent'></span>
          </h4>
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink to="/" className="text-zinc-400 hover:text-[#C46E88] transition-all duration-300 hover:translate-x-2 inline-flex items-center group">
                <i className="ri-question-line mr-2 group-hover:rotate-[360deg] transition-all duration-500"></i>FAQs
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders" className="text-zinc-400 hover:text-[#C46E88] transition-all duration-300 hover:translate-x-2 inline-flex items-center group">
                <i className="ri-truck-line mr-2 group-hover:translate-x-2 transition-all duration-300"></i>Shipping Info
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="text-zinc-400 hover:text-[#C46E88] transition-all duration-300 hover:translate-x-2 inline-flex items-center group">
                <i className="ri-exchange-line mr-2 group-hover:rotate-[360deg] transition-all duration-500"></i>Returns Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders" className="text-zinc-400 hover:text-[#C46E88] transition-all duration-300 hover:translate-x-2 inline-flex items-center group">
                <i className="ri-map-pin-time-line mr-2 group-hover:bounce transition-all duration-300"></i>Track Order
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className='sm:col-span-4 col-span-12'>
          <h4 className="text-xl mb-8 font-semibold text-white relative w-fit ">
            Contact Us
            <span className='absolute -bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#C46E88] via-[#EEA8B3] to-transparent'></span>
          </h4>
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink to="/contact" className="text-zinc-400 flex items-center gap-3 hover:translate-x-2 transition-all duration-300 cursor-pointer group hover:text-[#C46E88]">
                <i className="ri-map-pin-2-line text-[#C46E88] group-hover:scale-125 group-hover:rotate-12 transition-all duration-300"></i>
                123 FX Street, Style City, SC 12345
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="text-zinc-400 flex items-center gap-3 hover:translate-x-2 transition-all duration-300 cursor-pointer group hover:text-[#C46E88]">
                <i className="ri-phone-fill text-[#C46E88] group-hover:scale-125 group-hover:rotate-12 transition-all duration-300"></i>
                +1 (555) 123-4567
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="text-zinc-400 flex items-center gap-3 hover:translate-x-2 transition-all duration-300 cursor-pointer group hover:text-[#C46E88]">
                <i className="ri-mail-send-line text-[#C46E88] group-hover:scale-125 group-hover:translate-x-2 transition-all duration-300"></i>
                info@Clothix.com
              </NavLink>
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Footer
