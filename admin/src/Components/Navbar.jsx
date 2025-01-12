import React from 'react'
import logo from '../Assets/logo.png'

const Navbar = ({setToken}) => {
  return (
    <div className='w-full h-16  flex items-center justify-between px-4 border-b-[1px] border-black'>
       <img src={logo} alt="logo" className='w-[12vw]' />
       <button onClick={()=>{setToken("")}} className ='bg-[#c46e88] hover:bg-[#EEA8B3] transition-all text-white px-6 py-2 rounded-md'>log out</button>
    </div>
  )
}
export default Navbar