import React, { useContext} from 'react'
import { ShopContext } from '../Context/Context'

const CartTotal = () => {

const {getCardAmount,deliveryCharges,isSubscribed}= useContext(ShopContext)

 

  return (
    <div className='bg-zinc-800/80 rounded-lg p-5 transform transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#c46e88]/20 duration-300'>
      <div className="mb-6 flex items-center justify-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#c46e88]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-200">Order Summary</h2>
      </div>
      <div className='flex flex-col gap-4 text-gray-300'>
        {/**SUBSCRIBTION DISCOUNT */}
{isSubscribed?
<div className='flex justify-between items-center group p-2 bg-zinc-700/50 rounded-lg '>
          <span className='flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#c46e88]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            SUBSCRIBTION DISCOUNT 
          </span>
          <span className='font-mono group-hover:text-[#c46e88] transition-colors'>20%</span>
        </div>:<></>
}
        <div className='flex justify-between items-center group p-2 bg-zinc-700/50 rounded-lg '>
          <span className='flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#c46e88]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Subtotal
          </span>
          <span className='font-mono group-hover:text-[#c46e88] transition-colors'>${getCardAmount()}</span>
        </div>
        <div className='flex justify-between items-center group p-2 bg-zinc-700/50 rounded-lg '>
          <span className='flex items-center gap-2'>
          <i className="ri-truck-line h-6 w-6 text-[#c46e88]"></i>
            Delivery Charges
          </span>
          <span className='font-mono group-hover:text-[#c46e88] transition-colors'>${deliveryCharges}</span>
        </div>
        <div className='border-t border-zinc-600 pt-4'>
          <div className='flex justify-between items-center p-2 bg-gradient-to-r from-zinc-700 to-[#c46e88]/20 rounded-lg'>
            <span className='text-lg font-bold flex items-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#c46e88]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Total
            </span>
            <span className='text-lg font-bold font-mono text-[#c46e88]'>${getCardAmount() + deliveryCharges}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
